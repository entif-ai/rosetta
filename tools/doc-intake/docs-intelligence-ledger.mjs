import { Console } from 'node:console';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { setTimeout as sleep } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';

const logger = new Console({ stdout: process.stdout, stderr: process.stderr });
const defaultMaxFailures = 3;
const defaultStaleMs = 15 * 60 * 1000;

function sanitizeCell(value) {
  return String(value ?? '')
    .replace(/\r?\n/gu, ' ')
    .replace(/\|/gu, '/')
    .trim();
}

function splitRow(line) {
  return line
    .trim()
    .replace(/^\|/u, '')
    .replace(/\|$/u, '')
    .split('|')
    .map((cell) => cell.trim());
}

function formatRow(cells) {
  return `| ${cells.map(sanitizeCell).join(' | ')} |`;
}

function separatorFor(headers) {
  return formatRow(headers.map((header) => (header === 'failure_count' ? '---:' : '---')));
}

function findProcessingTable(lines) {
  const headerIndex = lines.findIndex((line) => /^\|\s*path\s*\|\s*processed\s*\|/iu.test(line));
  if (headerIndex === -1) {
    throw new Error('Could not find Per-Document Processing Log table with path/processed columns.');
  }

  let endIndex = headerIndex + 2;
  while (endIndex < lines.length && /^\s*\|.*\|\s*$/u.test(lines[endIndex])) {
    endIndex += 1;
  }

  return { headerIndex, separatorIndex: headerIndex + 1, endIndex };
}

function parseTable(text) {
  const lines = text.split(/\r?\n/u);
  const table = findProcessingTable(lines);
  const headers = splitRow(lines[table.headerIndex]);
  const rows = [];

  for (let lineIndex = table.separatorIndex + 1; lineIndex < table.endIndex; lineIndex += 1) {
    const cells = splitRow(lines[lineIndex]);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? '';
    });
    rows.push(row);
  }

  return { lines, table, headers, rows };
}

function ensureFailureCountColumn(parsed) {
  if (parsed.headers.includes('failure_count')) return parsed;

  const insertAt = parsed.headers.indexOf('processed') + 1;
  parsed.headers.splice(insertAt, 0, 'failure_count');
  for (const row of parsed.rows) {
    row.failure_count = '0';
  }
  return parsed;
}

function serializeTable(parsed) {
  const nextLines = [...parsed.lines];
  nextLines[parsed.table.headerIndex] = formatRow(parsed.headers);
  nextLines[parsed.table.separatorIndex] = separatorFor(parsed.headers);

  const renderedRows = parsed.rows.map((row) => formatRow(parsed.headers.map((header) => row[header] ?? '')));
  nextLines.splice(parsed.table.separatorIndex + 1, parsed.table.endIndex - parsed.table.separatorIndex - 1, ...renderedRows);
  return nextLines.join('\n');
}

function failureCount(row) {
  const current = Number.parseInt(row.failure_count || '0', 10);
  return Number.isFinite(current) ? current : 0;
}

function isClaimableRow(row, maxFailures) {
  if (row.processed === 'no' || row.processed === 'pending') return true;
  if (row.processed?.startsWith('failed:')) return failureCount(row) < maxFailures;
  return false;
}

function nextFailureCount(row) {
  return failureCount(row) + 1;
}

function findRow(rows, docPath) {
  const row = rows.find((candidate) => candidate.path === docPath);
  if (!row) {
    throw new Error(`Document not found in docs-intelligence ledger: ${docPath}`);
  }
  return row;
}

export function claimNextDoc(text, { agentId, branchName, now = new Date().toISOString(), maxFailures = defaultMaxFailures }) {
  if (!agentId) throw new Error('agentId is required to claim a document.');
  if (!branchName) throw new Error('branchName is required to claim a document.');

  const parsed = ensureFailureCountColumn(parseTable(text));
  const row = parsed.rows.find((candidate) => isClaimableRow(candidate, maxFailures));
  if (!row) {
    return { claimedPath: null, text: serializeTable(parsed) };
  }

  row.processed = `locked:${now}:${agentId}:${branchName}`;
  row.failure_count ||= '0';
  if ('timestamp' in row) row.timestamp = now;

  return {
    claimedPath: row.path,
    state: row.processed,
    text: serializeTable(parsed)
  };
}

export function completeDoc(text, { docPath, prNumber, now = new Date().toISOString(), findings, issuesDrafted }) {
  if (!docPath) throw new Error('docPath is required to complete a document.');
  if (!prNumber) throw new Error('prNumber is required to complete a document.');

  const parsed = ensureFailureCountColumn(parseTable(text));
  const row = findRow(parsed.rows, docPath);
  row.processed = `processed:${now}:${prNumber}`;
  row.failure_count ||= '0';
  if (findings !== undefined && 'findings' in row) row.findings = String(findings);
  if (issuesDrafted !== undefined && 'issues_drafted' in row) row.issues_drafted = String(issuesDrafted);
  if ('timestamp' in row) row.timestamp = now;

  return {
    state: 'processed',
    text: serializeTable(parsed)
  };
}

export function failDoc(text, { docPath, errorCode, summary, now = new Date().toISOString(), maxFailures = defaultMaxFailures }) {
  if (!docPath) throw new Error('docPath is required to fail a document.');
  if (!errorCode) throw new Error('errorCode is required to fail a document.');
  if (!summary) throw new Error('summary is required to fail a document.');

  const parsed = ensureFailureCountColumn(parseTable(text));
  const row = findRow(parsed.rows, docPath);
  const failures = nextFailureCount(row);
  row.failure_count = String(failures);
  const safeSummary = sanitizeCell(summary);
  const state = failures >= maxFailures ? 'blocked' : 'failed';
  row.processed = `${state}:${now}:${sanitizeCell(errorCode)}:${safeSummary}`;
  if ('notes' in row) row.notes = safeSummary;
  if ('timestamp' in row) row.timestamp = now;

  return {
    state,
    failureCount: failures,
    text: serializeTable(parsed)
  };
}

async function withLedgerLock(ledgerPath, operation, { staleMs = defaultStaleMs, retries = 40, retryMs = 50 } = {}) {
  const lockPath = `${ledgerPath}.lockdir`;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      await mkdir(lockPath);
      try {
        return await operation();
      } finally {
        await rm(lockPath, { force: true, recursive: true });
      }
    } catch (error) {
      if (error?.code !== 'EEXIST') throw error;

      try {
        const lockStats = await stat(lockPath);
        if (Date.now() - lockStats.mtimeMs > staleMs) {
          await rm(lockPath, { force: true, recursive: true });
          continue;
        }
      } catch (statError) {
        if (statError?.code !== 'ENOENT') throw statError;
      }

      if (attempt === retries) {
        throw new Error(`Could not acquire ledger lock: ${lockPath}`);
      }
      await sleep(retryMs);
    }
  }

  throw new Error(`Could not acquire ledger lock: ${lockPath}`);
}

function optionValue(args, name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

async function updateLedgerFile(ledgerPath, updater) {
  return withLedgerLock(ledgerPath, async () => {
    const current = await readFile(ledgerPath, 'utf8');
    const result = updater(current);
    await writeFile(ledgerPath, result.text.endsWith('\n') ? result.text : `${result.text}\n`);
    return result;
  });
}

export async function cli(args = process.argv.slice(2), { log = logger.log.bind(logger) } = {}) {
  const command = args[0];
  const ledgerPath = optionValue(args, '--ledger');
  if (!command || !ledgerPath) {
    throw new Error('Usage: docs-intelligence-ledger.mjs <claim|complete|fail> --ledger <path> [options]');
  }

  if (command === 'claim') {
    const result = await updateLedgerFile(ledgerPath, (text) =>
      claimNextDoc(text, {
        agentId: optionValue(args, '--agent-id'),
        branchName: optionValue(args, '--branch'),
        maxFailures: Number(optionValue(args, '--max-failures') ?? defaultMaxFailures),
        now: optionValue(args, '--now')
      })
    );
    log(JSON.stringify({ claimedPath: result.claimedPath, state: result.state ?? null }));
    return result;
  }

  if (command === 'complete') {
    const result = await updateLedgerFile(ledgerPath, (text) =>
      completeDoc(text, {
        docPath: optionValue(args, '--doc'),
        prNumber: optionValue(args, '--pr'),
        findings: optionValue(args, '--findings'),
        issuesDrafted: optionValue(args, '--issues-drafted'),
        now: optionValue(args, '--now')
      })
    );
    log(JSON.stringify({ state: result.state }));
    return result;
  }

  if (command === 'fail') {
    const result = await updateLedgerFile(ledgerPath, (text) =>
      failDoc(text, {
        docPath: optionValue(args, '--doc'),
        errorCode: optionValue(args, '--error-code'),
        summary: optionValue(args, '--summary'),
        maxFailures: Number(optionValue(args, '--max-failures') ?? defaultMaxFailures),
        now: optionValue(args, '--now')
      })
    );
    log(JSON.stringify({ state: result.state, failureCount: result.failureCount }));
    return result;
  }

  throw new Error(`Unknown docs-intelligence ledger command: ${command}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  cli().catch((error) => {
    logger.error(error);
    process.exitCode = 1;
  });
}
