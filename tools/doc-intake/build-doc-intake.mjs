import { createHash } from 'node:crypto';
import { Console } from 'node:console';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..', '..');
const docsRoot = path.join(root, 'docs');
const intakeRoot = path.join(docsRoot, 'intake');
const draftsRoot = path.join(intakeRoot, 'issue-drafts');
const issueLedgerPath = path.join(intakeRoot, 'github-issue-ledger.json');
const ledgerPath = path.join(intakeRoot, 'doc-ledger.json');
const ledgerMarkdownPath = path.join(intakeRoot, 'doc-ledger.md');
const readmePath = path.join(intakeRoot, 'README.md');
const logger = new Console({ stdout: process.stdout, stderr: process.stderr });

let generatedAt = 'pending';
const allowedExtensions = new Set(['.md', '.txt']);

const issueDrafts = [
  {
    id: 'docs-intake-ledger-and-issue-promotion',
    title: 'Build docs intake ledger and GitHub issue promotion workflow',
    priority: 'P0',
    effort: 'S',
    labels: ['docs-intake', 'governance', 'automation'],
    sourceRefs: [
      ['docs/handoffs/2026-04-13-bootstrap-handoff.md', 'Forbids large-scale corpus ingest before the refinery/cache exist and calls for token-economical future sessions.'],
      ['docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md', 'Defines cheap-first refinement, receipt discipline, and explicit backlog artifacts.'],
      ['docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md', 'Contains prior context on token economy, catalog validation, and backlog-as-tests behavior.']
    ],
    problem: 'The repo has a high-value documentation corpus, but no durable local map from parsed documents to issue candidates or published GitHub issues.',
    scope: [
      'Maintain a generated manifest of docs with hashes, dates, freshness, authority tier, and parsing status.',
      'Preserve manual GitHub issue references across re-runs.',
      'Generate local issue drafts before creating remote issues.',
      'Keep the workflow cheap enough for repeated Codex sessions.'
    ],
    acceptance: [
      '`pnpm run docs:intake` regenerates the ledger deterministically.',
      'The ledger excludes generated intake artifacts from source scanning.',
      'Existing `githubIssueRefs` and `status` fields are preserved when source hashes are unchanged.',
      'Generated issue drafts cite source documents and remain reviewable before publishing.'
    ],
    nonGoals: [
      'No full semantic corpus ingestion.',
      'No automatic GitHub issue creation without an explicit publish step.',
      'No replacement for the future Ingress Refinery or canonical corpus cache.'
    ]
  },
  {
    id: 'lean-validation-loop-and-local-receipts',
    title: 'Re-run lean validation loop and checkpoint local receipts',
    priority: 'P0',
    effort: 'XS',
    labels: ['validation', 'receipts', 'bootstrap'],
    sourceRefs: [
      ['docs/handoffs/2026-04-13-bootstrap-handoff.md', 'Lists the immediate next moves: run lean validation and checkpoint validated slices with local Conventional Commits.'],
      ['docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md', 'States current focus is clean verification under lint, typecheck, test, build, and demo.']
    ],
    problem: 'The bootstrap handoff says validation was strengthened but still needs a lean rerun and local receipt discipline.',
    scope: [
      'Run the lean validation path expected for the current repo state.',
      'Record any failures as targeted follow-up issues instead of broad uncertainty.',
      'Prepare small Conventional Commit slices only after validation evidence exists.'
    ],
    acceptance: [
      '`pnpm exec nx sync` completes.',
      '`pnpm run verify` completes or emits a concise failure ledger.',
      'Validation results are summarized in a durable local note or issue comment before any push.'
    ],
    nonGoals: ['No remote push unless explicitly requested.']
  },
  {
    id: 'expand-pack-schemas-and-shacl-source-artifacts',
    title: 'Expand pack schemas and SHACL coverage for receipts and source artifacts',
    priority: 'P1',
    effort: 'M',
    labels: ['schemas', 'shacl', 'receipts', 'source-substrate'],
    sourceRefs: [
      ['docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md', 'Names this as the first next execution item.'],
      ['docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md', 'Makes schema validation, receipt tests, and conformance checks merge-blocking.'],
      ['docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md', 'Provides source/provenance doctrine for artifact modeling.']
    ],
    problem: 'The bootstrap slice has minimal conformance output, but pack-level receipt/source artifact shapes need broader, merge-blocking coverage.',
    scope: [
      'Add or extend schemas for receipt bundles, source records, manifestations, trust matrices, and canonical artifacts.',
      'Expand SHACL emission for the same artifact families.',
      'Add focused tests for malformed source and receipt artifacts.'
    ],
    acceptance: [
      'Representative valid receipt/source fixtures pass schema and SHACL checks.',
      'Malformed lineage, rights, or provenance fields fail with clear errors.',
      'Conformance output remains deterministic and small enough for CLI inspection.'
    ],
    nonGoals: ['No new external acquisition adapters in this issue.']
  },
  {
    id: 'real-acquisition-adapters-behind-refinery-boundary',
    title: 'Add real acquisition adapters behind the refinery boundary',
    priority: 'P1',
    effort: 'L',
    labels: ['ingress-refinery', 'adapters', 'source-registry'],
    sourceRefs: [
      ['docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md', 'Names real acquisition adapters as the next step after schema/SHACL expansion.'],
      ['docs/handoffs/2026-04-13-bootstrap-handoff.md', 'Notes real external source adapters are not implemented yet.'],
      ['docs/governance/20260412 - Source Registry and Repository Profile Annex.md', 'Lists source systems and repository profile expectations.']
    ],
    problem: 'The current refinery is parse-only and demo-backed; Text-Core needs real text-source families while preserving parse-only safety.',
    scope: [
      'Implement one or two bounded read-only text acquisition adapters first.',
      'Route adapter output through existing source record, manifestation, normalization, and receipt paths.',
      'Keep network and side-effect behavior explicit and guardable.'
    ],
    acceptance: [
      'At least one real adapter produces source records and manifestations from a local or read-only source.',
      'Fetch and normalization receipts are emitted for acquired text.',
      'Adapter tests do not require live network by default.'
    ],
    nonGoals: ['No bulk corpus import.', 'No side-effecting execution adapters.']
  },
  {
    id: 'canonical-cache-persistence',
    title: 'Persist canonical corpus cache beyond the in-memory slice',
    priority: 'P1',
    effort: 'M',
    labels: ['canonical-cache', 'storage', 'dedupe'],
    sourceRefs: [
      ['docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md', 'Names cache persistence as the third next execution item.'],
      ['docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md', 'Separates truth/provenance from cache/index and calls for Postgres/pgvector later.'],
      ['docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md', 'Defines storage and memory-plane separation doctrine.']
    ],
    problem: 'The cache currently clusters artifacts in memory, so dedupe/lifecycle state disappears across runs.',
    scope: [
      'Add a minimal local persistence backend suited to bootstrap usage.',
      'Preserve byte, manifestation, record-family, and conceptual cluster indexes.',
      'Keep append-only lifecycle/correction events separate from mutable cache indexes.'
    ],
    acceptance: [
      'Cache state survives process restart in a local development path.',
      'Persistence round-trips do not alter artifact CIDs or canonical payloads.',
      'Tests cover dedupe proposal continuity before and after reload.'
    ],
    nonGoals: ['No production Postgres migration in this issue unless explicitly pulled forward.']
  },
  {
    id: 'coverage-thresholds-and-acceptance-matrices',
    title: 'Add coverage reporting and package acceptance matrices',
    priority: 'P2',
    effort: 'M',
    labels: ['testing', 'coverage', 'acceptance'],
    sourceRefs: [
      ['docs/handoffs/2026-04-13-bootstrap-handoff.md', 'Calls out missing quantitative coverage thresholds and targeted acceptance matrices as possible next decisions.'],
      ['docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md', 'Defines merge-blocking test categories and backlog-only red test policy.']
    ],
    problem: 'The current test suite is stronger than before, but coverage expectations and package-level acceptance matrices are not yet explicit.',
    scope: [
      'Add coverage reporting for bootstrap packages.',
      'Define initial thresholds that are realistic but non-vacuous.',
      'Create acceptance matrices for current bootstrap package/app contracts.'
    ],
    acceptance: [
      'Coverage command is documented and runnable locally.',
      'Threshold failures are easy to interpret.',
      'Acceptance matrices map package contracts to tests and docs.'
    ],
    nonGoals: ['No broad refactor of existing tests unless required for reliable reporting.']
  },
  {
    id: 'text-core-mvp-scope-gate',
    title: 'Define Text-Core MVP scope gate from governing docs',
    priority: 'P1',
    effort: 'S',
    labels: ['planning', 'text-core', 'scope'],
    sourceRefs: [
      ['docs/backlog/20260411 - Rosetta Canonical Build Charter (v0.1).md', 'Defines Text-Core MVP exit criteria and warns against premature alpha claims.'],
      ['docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md', 'Defines Rung B: Text-Core MVP.'],
      ['docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md', 'Recent synthesis input for Rosetta/Entif PRD revisions.']
    ],
    problem: 'The docs contain a clear Text-Core direction, but the next execution gate should be extracted into a small, decision-ready issue before implementation fans out.',
    scope: [
      'Summarize the minimal Text-Core MVP contract.',
      'Identify which bootstrap packages must change first.',
      'Produce a short issue dependency graph for Text-Core work.'
    ],
    acceptance: [
      'The issue identifies must-have, should-have, and deferred Text-Core capabilities.',
      'Each must-have has source references and at least one likely package/app target.',
      'The output can drive 3-7 follow-up implementation issues.'
    ],
    nonGoals: ['No implementation changes in this planning issue.']
  }
];

function posixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function normalizeHeading(value) {
  return value.replace(/^#+\s*/u, '').replace(/\s+#*$/u, '').trim();
}

function pad2(value) {
  return String(value).padStart(2, '0');
}

function normalizeDateTime(rawValue) {
  const cleaned = rawValue.trim().replace(/\s+/gu, ' ');
  const ymd = cleaned.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})(?:,?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?)?/iu);
  const mdy = cleaned.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})(?:,?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?)?/iu);
  const match = ymd ?? mdy;
  if (!match) return undefined;

  const year = ymd ? match[1] : match[3];
  const month = ymd ? match[2] : match[1];
  const day = ymd ? match[3] : match[2];
  const date = `${year}-${pad2(month)}-${pad2(day)}`;

  if (!match[4] || !match[5]) {
    return { date, localDateTime: date };
  }

  let hour = Number(match[4]);
  const minute = match[5];
  const second = match[6] ?? '00';
  const meridiem = match[7]?.toUpperCase();
  if (meridiem === 'PM' && hour < 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;

  return {
    date,
    localDateTime: `${date}T${pad2(hour)}:${minute}:${second}`
  };
}

export function extractTopMatterDates(text) {
  const evidence = {};
  const lines = text.split(/\r?\n/u).slice(0, 80);
  const labelToKind = {
    Created: 'createdAt',
    Date: 'declaredAt',
    Exported: 'exportedAt',
    Updated: 'updatedAt'
  };

  lines.forEach((line, index) => {
    const match = line.match(/^\s*(?:\*\*)?(Created|Updated|Exported|Date):(?:\*\*)?\s*(.+?)\s*$/u);
    if (!match) return;
    const [, label, rawValue] = match;
    const normalized = normalizeDateTime(rawValue);
    if (!normalized) return;
    evidence[labelToKind[label]] = {
      date: normalized.date,
      line: index + 1,
      localDateTime: normalized.localDateTime,
      raw: rawValue,
      source: 'top-matter'
    };
  });

  return evidence;
}

function inferPathDate(relativePath) {
  const filenameMatch = relativePath.match(/(20\d{2})[- ]?(\d{2})[- ]?(\d{2})/u);
  if (filenameMatch) {
    return {
      date: `${filenameMatch[1]}-${filenameMatch[2]}-${filenameMatch[3]}`,
      raw: filenameMatch[0],
      source: 'path'
    };
  }

  return undefined;
}

export function buildChronology(relativePath, text, stats, previousDoc, intakeRunAt) {
  const topMatter = extractTopMatterDates(text);
  const pathDate = inferPathDate(relativePath);
  const filesystemModifiedAt = stats.mtime.toISOString();
  const fallbackModified = {
    date: filesystemModifiedAt.slice(0, 10),
    isoDateTime: filesystemModifiedAt,
    source: 'filesystem-mtime'
  };

  const primary =
    topMatter.updatedAt ??
    topMatter.createdAt ??
    topMatter.declaredAt ??
    topMatter.exportedAt ??
    pathDate ??
    fallbackModified;
  const primaryKind =
    primary === topMatter.updatedAt
      ? 'updatedAt'
      : primary === topMatter.createdAt
        ? 'createdAt'
        : primary === topMatter.declaredAt
          ? 'declaredAt'
          : primary === topMatter.exportedAt
            ? 'exportedAt'
            : primary === pathDate
              ? 'pathDate'
              : 'filesystemModifiedAt';

  return {
    canonical: topMatter,
    fallback: {
      filesystemModifiedAt: fallbackModified,
      pathDate
    },
    intake: {
      firstIndexedAt: previousDoc?.chronology?.intake?.firstIndexedAt ?? previousDoc?.intake?.firstIndexedAt ?? intakeRunAt,
      observedAt: previousDoc?.chronology?.intake?.observedAt ?? previousDoc?.intake?.observedAt ?? intakeRunAt
    },
    primary: {
      date: primary.date,
      kind: primaryKind,
      localDateTime: primary.localDateTime,
      source: primary.source
    }
  };
}

function inferAuthorityTier(relativePath) {
  if (relativePath.startsWith('docs/live/')) return 'live';
  if (relativePath.startsWith('docs/governance/') || relativePath.startsWith('docs/handoffs/')) return 'governing';
  if (relativePath.startsWith('docs/backlog/') || relativePath.startsWith('docs/PRDs/') || relativePath.startsWith('docs/RFCs/')) return 'planning';
  if (relativePath.startsWith('docs/packs/')) return 'pack-contract';
  if (relativePath.startsWith('docs/chats/')) return 'source-dialogue';
  if (relativePath.startsWith('docs/frontier/') || relativePath.startsWith('docs/external/')) return 'research-context';
  if (relativePath.startsWith('docs/ideas/')) return 'exploratory';
  return 'unclassified';
}

export function inferFreshness(docDate, dateKind) {
  if (dateKind === 'filesystemModifiedAt') return 'undated-import';
  if (docDate >= '2026-04-01') return 'current';
  if (docDate >= '2026-03-01') return 'recent';
  if (docDate >= '2026-01-01') return 'near-history';
  if (docDate >= '2025-10-01') return 'legacy-design';
  return 'archive';
}

function inferCategory(relativePath) {
  return relativePath.split('/')[1] ?? 'docs';
}

function titleFrom(relativePath, text) {
  const heading = text.split(/\r?\n/u).find((line) => /^#\s+\S/u.test(line));
  if (heading) return normalizeHeading(heading);
  return path.basename(relativePath, path.extname(relativePath));
}

function extractHeadings(text) {
  return text
    .split(/\r?\n/u)
    .filter((line) => /^#{1,3}\s+\S/u.test(line))
    .slice(0, 16)
    .map(normalizeHeading);
}

function wordCount(text) {
  return (text.match(/\S+/gu) ?? []).length;
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = posixPath(path.relative(root, fullPath));
    if (entry.isDirectory()) {
      if (relativePath === 'docs/intake') continue;
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && allowedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}

async function readPreviousLedger() {
  try {
    const parsed = JSON.parse(await readFile(ledgerPath, 'utf8'));
    return new Map(parsed.documents.map((doc) => [doc.path, doc]));
  } catch {
    return new Map();
  }
}

async function readIssueLedger() {
  try {
    return JSON.parse(await readFile(issueLedgerPath, 'utf8'));
  } catch {
    const emptyLedger = {
      schemaVersion: 1,
      documents: {},
      issueDrafts: {}
    };
    await writeFile(issueLedgerPath, `${JSON.stringify(emptyLedger, null, 2)}\n`);
    return emptyLedger;
  }
}

function buildDraftMarkdown(draft, docByPath) {
  const sourceLines = draft.sourceRefs.map(([sourcePath, reason]) => {
    const doc = docByPath.get(sourcePath);
    const hash = doc ? `; hash ${doc.sha256.slice(0, 12)}` : '';
    return `- \`${sourcePath}\`${hash}: ${reason}`;
  });

  return `# ${draft.title}

Issue draft id: \`${draft.id}\`
Priority: \`${draft.priority}\`
Effort: \`${draft.effort}\`
Labels: ${draft.labels.map((label) => `\`${label}\``).join(', ')}

## Problem

${draft.problem}

## Scope

${draft.scope.map((item) => `- ${item}`).join('\n')}

## Acceptance Criteria

${draft.acceptance.map((item) => `- [ ] ${item}`).join('\n')}

## Source Evidence

${sourceLines.join('\n')}

## Non-Goals

${draft.nonGoals.map((item) => `- ${item}`).join('\n')}

## Publishing Notes

- Local status: \`candidate\`
- GitHub issue: \`pending\`
- Recommended publish command shape: \`gh issue create --title "${draft.title.replaceAll('"', '\\"')}" --body-file docs/intake/issue-drafts/${draft.id}.md --label ${draft.labels.join(',')}\`
`;
}

function buildLedgerMarkdown(documents) {
  const byAuthority = Map.groupBy(documents, (doc) => doc.authorityTier);
  const sections = [...byAuthority.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([authority, docs]) => {
      const rows = docs
        .sort((left, right) => right.docDate.localeCompare(left.docDate) || left.path.localeCompare(right.path))
        .slice(0, 30)
        .map((doc) => `| ${doc.docDate} | ${doc.freshness} | \`${doc.path}\` | ${doc.words} | ${doc.status} |`);
      return `## ${authority}

| Date | Freshness | Path | Words | Status |
| --- | --- | --- | ---: | --- |
${rows.join('\n')}
`;
    });

  return `# Docs Intake Ledger

Generated: ${generatedAt}

This is the human-readable companion to \`docs/intake/doc-ledger.json\`. It is intentionally shallow: hashes and issue references live in JSON; this file is for quick orientation.

${sections.join('\n')}
`;
}

function buildReadme(documents) {
  const currentCount = documents.filter((doc) => doc.freshness === 'current').length;
  const governingCount = documents.filter((doc) => ['governing', 'live', 'planning', 'pack-contract'].includes(doc.authorityTier)).length;
  const canonicalDateCount = documents.filter((doc) => doc.chronology.primary.source === 'top-matter').length;

  return `# Docs Intake

This folder tracks local documentation parsing and issue-draft promotion without performing large-scale semantic corpus ingest.

## Workflow

1. Run \`pnpm run docs:intake\`.
2. Review \`docs/intake/doc-ledger.md\` for corpus shape.
3. Review candidate issues under \`docs/intake/issue-drafts/\`.
4. Publish only the chosen issue drafts to GitHub, then record the issue URL/number in \`docs/intake/github-issue-ledger.json\`.

## Current Snapshot

- Documents indexed: ${documents.length}
- Current April 2026 docs: ${currentCount}
- Governing/planning/live docs: ${governingCount}
- Docs dated by canonical top matter: ${canonicalDateCount}
- Generated at: ${generatedAt}

## Policy

- Newer files supersede older files by default when they conflict.
- Top-matter dates are preferred over filename dates; filename dates are preferred over filesystem mtime.
- Chat-style \`Created\`, \`Updated\`, and \`Exported\` stamps are stored separately under each document's \`chronology.canonical\` object.
- \`docs/live/\`, \`docs/governance/\`, \`docs/handoffs/\`, \`docs/backlog/\`, \`docs/PRDs/\`, and \`docs/RFCs/\` carry higher authority than chats, ideas, external notes, or frontier research.
- Local issue drafts are the review gate before GitHub issue creation.
- The ledger is a map, not the canonical corpus cache promised by the architecture.
`;
}

export async function main() {
  await mkdir(draftsRoot, { recursive: true });
  const previous = await readPreviousLedger();
  const issueLedger = await readIssueLedger();
  const files = await collectFiles(docsRoot);
  const documents = [];
  const intakeRunAt = process.env.DOC_INTAKE_RUN_AT ?? new Date().toISOString();

  for (const file of files) {
    const relativePath = posixPath(path.relative(root, file));
    const [stats, text] = await Promise.all([stat(file), readFile(file, 'utf8')]);
    const sha256 = createHash('sha256').update(text).digest('hex');
    const previousDoc = previous.get(relativePath);
    const issueDoc = issueLedger.documents?.[relativePath] ?? {};
    const chronology = buildChronology(relativePath, text, stats, previousDoc, intakeRunAt);
    const docDate = chronology.primary.date;
    const candidateRefs = issueDrafts
      .filter((draft) => draft.sourceRefs.some(([sourcePath]) => sourcePath === relativePath))
      .map((draft) => draft.id);

    documents.push({
      path: relativePath,
      title: titleFrom(relativePath, text),
      category: inferCategory(relativePath),
      authorityTier: inferAuthorityTier(relativePath),
      freshness: inferFreshness(docDate, chronology.primary.kind),
      docDate,
      dateSource: chronology.primary.source,
      dateKind: chronology.primary.kind,
      chronology,
      modifiedAt: stats.mtime.toISOString(),
      bytes: stats.size,
      words: wordCount(text),
      sha256,
      headings: extractHeadings(text),
      status: issueDoc.status ?? (previousDoc?.sha256 === sha256 ? (previousDoc.status ?? 'indexed') : 'indexed'),
      githubIssueRefs: issueDoc.githubIssueRefs ?? (previousDoc?.sha256 === sha256 ? (previousDoc.githubIssueRefs ?? []) : []),
      issueCandidateRefs: candidateRefs
    });
  }

  documents.sort((left, right) => left.path.localeCompare(right.path));
  generatedAt =
    process.env.DOC_INTAKE_GENERATED_AT ??
    documents.reduce((latest, doc) => (doc.modifiedAt > latest ? doc.modifiedAt : latest), '1970-01-01T00:00:00.000Z');
  const docByPath = new Map(documents.map((doc) => [doc.path, doc]));

  const ledger = {
    generatedAt,
    policy: {
      conflictResolution: 'Prefer newer docs within the same authority tier; prefer live/governance/handoff/backlog/PRD/RFC sources over chats, ideas, external notes, and frontier research.',
      ingestBoundary: 'This ledger fingerprints and orients docs. It does not perform large-scale semantic corpus ingest.',
      publishBoundary: 'GitHub issues should be created from reviewed local drafts, then linked back through docs/intake/github-issue-ledger.json.'
    },
    documents
  };

  await writeFile(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
  await writeFile(ledgerMarkdownPath, buildLedgerMarkdown(documents));
  await writeFile(readmePath, buildReadme(documents));

  for (const draft of issueDrafts) {
    await writeFile(path.join(draftsRoot, `${draft.id}.md`), buildDraftMarkdown(draft, docByPath));
  }

  logger.log(`Indexed ${documents.length} docs and wrote ${issueDrafts.length} issue drafts.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    logger.error(error);
    process.exitCode = 1;
  });
}
