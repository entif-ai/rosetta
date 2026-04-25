import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const extractionPathPattern = /^docs\/intake\/docs-intelligence\/20\d{2}-\d{2}-\d{2}-.+\.md$/u;
const issueDraftPathPattern = /docs\/intake\/issue-drafts\/[A-Za-z0-9._-]+\.md/gu;
const existingIssuePattern = /(?:https:\/\/github\.com\/entif-ai\/rosetta\/issues\/\d+|(?<![A-Za-z0-9_-])#\d+)/gu;

function parseArgs(argv) {
  const args = {
    base: 'origin/main'
  };

  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--base') {
      args.base = argv[index + 1];
      index += 1;
    }
  }

  return args;
}

async function git(args) {
  const { stdout } = await execFileAsync('git', args, {
    cwd: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..'),
    maxBuffer: 1024 * 1024 * 8
  });
  return stdout.trim();
}

export function issueCandidatesSection(markdown) {
  const lines = markdown.split(/\r?\n/u);
  const start = lines.findIndex((line) => /^##\s+Issue Candidates\s*$/iu.test(line.trim()));
  if (start === -1) return '';

  const nextHeading = lines.findIndex((line, index) => index > start && /^##\s+\S/u.test(line));
  return lines.slice(start + 1, nextHeading === -1 ? undefined : nextHeading).join('\n');
}

export function issueCandidateRows(markdown) {
  return issueCandidatesSection(markdown)
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|'))
    .filter((line) => !/^\|\s*-+\s*\|/u.test(line))
    .filter((line) => !/^\|\s*Title\s*\|/iu.test(line))
    .filter((line) => line.replace(/[|\s]/gu, '').length > 0);
}

export function coverageRefs(markdown) {
  const section = issueCandidatesSection(markdown);
  return {
    draftPaths: [...new Set(section.match(issueDraftPathPattern) ?? [])],
    existingIssues: [...new Set(section.match(existingIssuePattern) ?? [])]
  };
}

export function validateExtractionCoverage(relativePath, markdown, changedFiles) {
  const rows = issueCandidateRows(markdown);
  if (rows.length === 0) return [];

  const { draftPaths, existingIssues } = coverageRefs(markdown);
  const problems = [];
  const coverageCount = draftPaths.length + existingIssues.length;

  if (coverageCount < rows.length) {
    problems.push(`${relativePath}: ${rows.length} issue candidate row(s), but only ${coverageCount} draft/existing-issue reference(s) in the Issue Candidates section.`);
  }

  const missingDrafts = draftPaths.filter((draftPath) => !changedFiles.has(draftPath));
  if (missingDrafts.length > 0) {
    problems.push(`${relativePath}: referenced draft(s) were not added/modified in this PR: ${missingDrafts.join(', ')}`);
  }

  return problems;
}

export async function validateDocsIntelligencePr({ base = 'origin/main' } = {}) {
  const mergeBase = await git(['merge-base', base, 'HEAD']);
  const changedOutput = await git(['diff', '--name-only', mergeBase, 'HEAD']);
  const changedFiles = new Set(changedOutput ? changedOutput.split(/\r?\n/u) : []);
  const changedExtractions = [...changedFiles].filter((file) => extractionPathPattern.test(file));
  const problems = [];

  if (changedExtractions.length === 0) {
    return { changedExtractions, problems };
  }

  if (!changedFiles.has('docs/intake/docs-intelligence/KNOWLEDGE_GRAPH.yaml')) {
    problems.push('docs-intelligence PR changed extraction artifacts but did not update docs/intake/docs-intelligence/KNOWLEDGE_GRAPH.yaml.');
  }

  for (const extractionPath of changedExtractions) {
    const markdown = await readFile(extractionPath, 'utf8');
    problems.push(...validateExtractionCoverage(extractionPath, markdown, changedFiles));
  }

  return { changedExtractions, problems };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  validateDocsIntelligencePr(args)
    .then(({ changedExtractions, problems }) => {
      if (changedExtractions.length === 0) {
        console.log('No changed docs-intelligence extraction artifacts found.');
        return;
      }

      if (problems.length > 0) {
        console.error(`Docs-intelligence validation failed for ${changedExtractions.length} extraction artifact(s):`);
        for (const problem of problems) console.error(`- ${problem}`);
        process.exitCode = 1;
        return;
      }

      console.log(`Docs-intelligence validation passed for ${changedExtractions.length} extraction artifact(s).`);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
