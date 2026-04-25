import { Console } from 'node:console';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..', '..');
const docsIntelligenceRoot = path.join(root, 'docs', 'intake', 'docs-intelligence');
const issueDraftsRoot = path.join(root, 'docs', 'intake', 'issue-drafts');
const conceptIndexPath = path.join(docsIntelligenceRoot, 'CONCEPT_INDEX.json');
const cycleSummaryPath = path.join(docsIntelligenceRoot, 'CYCLE_SUMMARY.md');
const logger = new Console({ stdout: process.stdout, stderr: process.stderr });

const stopWords = new Set([
  'a',
  'add',
  'and',
  'as',
  'for',
  'gap',
  'issue',
  'missing',
  'of',
  'the',
  'to',
  'undefined',
  'with'
]);

function slugify(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[`*_()[\]:"'.,/]+/gu, ' ')
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-|-$/gu, '');
}

function splitMarkdownRow(line) {
  return line
    .trim()
    .replace(/^\|/u, '')
    .replace(/\|$/u, '')
    .split('|')
    .map((cell) => cell.trim());
}

function addUnique(list, value) {
  if (value && !list.includes(value)) list.push(value);
}

function parseSourcePath(text, fallbackPath) {
  const sourceMatch = text.match(/^- \*\*?Path:\*\*?\s*`?([^`\n]+?)`?\s*$/imu) ?? text.match(/^- Path:\s*`?([^`\n]+?)`?\s*$/imu);
  return sourceMatch?.[1]?.trim() ?? fallbackPath;
}

function parseTitle(text, fallbackPath) {
  const heading = text.match(/^#\s+(.+)$/mu)?.[1]?.trim();
  return heading ?? path.basename(fallbackPath, path.extname(fallbackPath));
}

function parseLabels(text) {
  const inline = text.match(/^Labels:\s*(.+)$/imu)?.[1];
  if (inline) {
    return inline
      .split(',')
      .map((label) => slugify(label))
      .filter(Boolean);
  }

  const labelsSection = text.match(/## Labels\s+([\s\S]*?)(?:\n## |\n---|\n$)/iu)?.[1] ?? '';
  return Array.from(labelsSection.matchAll(/`([^`]+)`/gu), (match) => slugify(match[1])).filter(Boolean);
}

function issueSignature(title) {
  const tokens = slugify(title)
    .split('-')
    .filter((token) => token.length > 2 && !stopWords.has(token))
    .sort();
  return tokens.slice(0, 5).join('-');
}

function recordConcept(concepts, conceptId, docPath, issuePath) {
  if (!conceptId) return;
  concepts[conceptId] ??= { documents: [], issueDrafts: [] };
  addUnique(concepts[conceptId].documents, docPath);
  addUnique(concepts[conceptId].issueDrafts, issuePath);
}

function parseFindingConcepts(text) {
  const concepts = [];
  const lines = text.split(/\r?\n/u);
  const headerIndex = lines.findIndex((line) => {
    if (!/^\s*\|.*\|\s*$/u.test(line)) return false;
    const headers = splitMarkdownRow(line).map(slugify);
    return headers.includes('timestamp') && headers.includes('tags') && headers.includes('subjects');
  });
  if (headerIndex === -1) return concepts;

  const headers = splitMarkdownRow(lines[headerIndex]).map(slugify);
  const tagsIndex = headers.indexOf('tags');
  const subjectsIndex = headers.indexOf('subjects');

  for (let index = headerIndex + 2; index < lines.length && /^\s*\|.*\|\s*$/u.test(lines[index]); index += 1) {
    const cells = splitMarkdownRow(lines[index]);
    for (const cellIndex of [tagsIndex, subjectsIndex]) {
      if (cellIndex === -1) continue;
      for (const value of cells[cellIndex].split(/[,;]/u)) {
        const conceptId = slugify(value);
        if (conceptId) concepts.push(conceptId);
      }
    }
  }

  return concepts;
}

export function buildDocsIntelligenceIndex({ extractions, issueDrafts }) {
  const concepts = {};
  const documents = [];
  const drafts = [];

  for (const extraction of extractions) {
    const sourcePath = parseSourcePath(extraction.text, extraction.path);
    const title = parseTitle(extraction.text, extraction.path);
    const extractionConcepts = Array.from(new Set(parseFindingConcepts(extraction.text)));
    documents.push({
      extractionPath: extraction.path,
      sourcePath,
      title,
      concepts: extractionConcepts
    });
    for (const conceptId of extractionConcepts) {
      recordConcept(concepts, conceptId, sourcePath);
    }
  }

  for (const draft of issueDrafts) {
    const title = parseTitle(draft.text, draft.path).replace(/^Issue Draft:\s*/iu, '');
    const labels = parseLabels(draft.text);
    const signature = issueSignature(title);
    const draftRecord = { path: draft.path, title, labels, signature };
    drafts.push(draftRecord);
    for (const conceptId of labels) {
      recordConcept(concepts, conceptId, undefined, draft.path);
    }
  }

  const clusters = Object.values(
    drafts.reduce((groups, draft) => {
      if (!draft.signature) return groups;
      groups[draft.signature] ??= { signature: draft.signature, drafts: [] };
      groups[draft.signature].drafts.push({ path: draft.path, title: draft.title });
      return groups;
    }, {})
  ).filter((group) => group.drafts.length > 1);

  return {
    generatedAt: null,
    documents,
    issueDrafts: drafts,
    concepts,
    duplicateIssueDraftClusters: clusters
  };
}

export function buildCycleSummary(index, { generatedAt = new Date().toISOString() } = {}) {
  const conceptRows = Object.entries(index.concepts)
    .filter(([, concept]) => concept.documents.length > 1 || concept.issueDrafts.length > 0)
    .sort(([, left], [, right]) => right.documents.length + right.issueDrafts.length - (left.documents.length + left.issueDrafts.length))
    .slice(0, 100)
    .map(([conceptId, concept]) => `| \`${conceptId}\` | ${concept.documents.length} | ${concept.issueDrafts.length} |`);

  const docRows = index.documents
    .slice()
    .sort((left, right) => left.sourcePath.localeCompare(right.sourcePath))
    .map((doc) => `| \`${doc.sourcePath}\` | \`${doc.extractionPath}\` | ${doc.concepts.slice(0, 8).map((concept) => `\`${concept}\``).join(', ')} |`);

  const duplicateSection =
    index.duplicateIssueDraftClusters.length === 0
      ? '- None detected by normalized title signature.'
      : index.duplicateIssueDraftClusters
          .map((cluster) => {
            const drafts = cluster.drafts.map((draft) => `  - \`${draft.path}\` - ${draft.title}`).join('\n');
            return `- Signature \`${cluster.signature}\`\n${drafts}`;
          })
          .join('\n');

  return `# Docs Intelligence Cycle Summary

Generated: ${generatedAt}

This file is generated by \`pnpm run docs:intelligence\`. It is the compact agent boot surface for DI-009: processed docs, concept coverage, and duplicate issue-draft signals.

## Processed Extraction Artifacts

| Source document | Extraction artifact | Concepts |
| --- | --- | --- |
${docRows.join('\n')}

## Concept Index

Showing cross-document or issue-linked concepts only. Full query surface: \`docs/intake/docs-intelligence/CONCEPT_INDEX.json\`.

| Concept | Documents | Issue drafts |
| --- | ---: | ---: |
${conceptRows.join('\n')}

## Duplicate Issue-Draft Signals

${duplicateSection}
`;
}

async function readMarkdownFiles(directory, filter = () => true) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md') || !filter(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    files.push({
      path: path.relative(root, absolutePath).split(path.sep).join('/'),
      text: await readFile(absolutePath, 'utf8')
    });
  }
  files.sort((left, right) => left.path.localeCompare(right.path));
  return files;
}

export async function main({ generatedAt = process.env.DOC_INTELLIGENCE_GENERATED_AT ?? 'deterministic-from-current-files' } = {}) {
  const extractions = await readMarkdownFiles(docsIntelligenceRoot, (name) => !['CHEAP_AGENT_RUNBOOK.md', 'EXTRACTION_TEMPLATE.md', 'PRIORITY_QUEUE.md', 'SUBAGENT_BOOT.md', 'CYCLE_SUMMARY.md'].includes(name));
  const issueDrafts = await readMarkdownFiles(issueDraftsRoot);
  const index = buildDocsIntelligenceIndex({ extractions, issueDrafts });
  index.generatedAt = generatedAt;
  await writeFile(conceptIndexPath, `${JSON.stringify(index, null, 2)}\n`);
  await writeFile(cycleSummaryPath, buildCycleSummary(index, { generatedAt }));
  logger.log(`Indexed ${index.documents.length} extraction artifacts, ${Object.keys(index.concepts).length} concepts, and ${index.issueDrafts.length} issue drafts.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    logger.error(error);
    process.exitCode = 1;
  });
}
