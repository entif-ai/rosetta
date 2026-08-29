import { describe, expect, it } from 'vitest';

import {
  buildRosettaCliOutput,
  buildRosettaTamperReport,
  buildRosettaVerificationReport,
  runRosettaCli,
} from './rosetta-cli.js';

describe('rosetta-cli', () => {
  it('builds a bootstrap output with verified receipts and read-only projections', () => {
    const output = buildRosettaCliOutput();

    expect(output.receiptBundleVerification.ok).toBe(true);
    expect(output.signedReceiptVerification.ok).toBe(true);
    expect(output.ob1.mutable).toBe(false);
    expect(output.prism.viewMode).toBe('shadow-memory');
    expect(output.missionControl.viewMode).toBe('operator-shell');
  });

  it('exposes deterministic Bootstrap Gate verification evidence', () => {
    const output = buildRosettaCliOutput();

    expect(output).not.toHaveProperty('guardlessNote');
    expect(output.bootstrapGate.status).toBe('pass');
    expect(output.bootstrapGate.guard.effect).toBe('allow');
    expect(output.bootstrapGate.echoOutput).toBe(
      output.bootstrapGate.canonicalInput
    );
    expect(output.bootstrapGate.receiptBundleVerification.ok).toBe(true);
    expect(output.bootstrapGate.steps.map((step) => step.id)).toEqual([
      'canonicalize-input',
      'compute-cid',
      'guard-decision',
      'execute-builtin-echo',
      'mint-observation',
      'emit-receipt',
      'compile-closure',
      'verify-chain',
    ]);
  });

  it('includes schema catalog inspection data without promoting reserved interfaces', () => {
    const output = buildRosettaCliOutput();

    expect(output.schemaCatalog).toMatchObject({
      entries: expect.arrayContaining([
        expect.objectContaining({
          exposureStatus: 'downstream-contract',
          schemaId: 'entif.agentic-messaging.envelope.v1',
        }),
        expect.objectContaining({
          exposureStatus: 'reserved-interface',
          schemaId: 'entif.iam.decision.ref',
        }),
      ]),
    });
  });

  it('preserves the no-argument aggregate JSON output', () => {
    const execution = runRosettaCli([]);
    const output: unknown = JSON.parse(execution.stdout);

    expect(execution.exitCode).toBe(0);
    expect(execution.stderr).toBe('');
    expect(output).toMatchObject({
      bootstrapGate: { status: 'pass' },
      receiptBundleVerification: { ok: true },
      signedReceiptVerification: { ok: true },
    });
  });

  it('inspects pass, block, deny, and fail Bootstrap Gate scenarios through one report shape', () => {
    const scenarios = ['pass', 'block', 'deny', 'fail'] as const;

    for (const scenario of scenarios) {
      const execution = runRosettaCli([
        'inspect',
        'bootstrap-gate',
        `--scenario=${scenario}`,
      ]);
      const output: unknown = JSON.parse(execution.stdout);

      expect(execution.exitCode).toBe(0);
      expect(execution.stderr).toBe('');
      expect(output).toMatchObject({
        bootstrapGate: {
          status: scenario,
          verdict: scenario,
        },
        scenario,
        status: 'fixture-backed',
      });
    }
  });

  it('verifies the guarded bootstrap, signed receipt, and receipt-bundle closure', () => {
    const report = buildRosettaVerificationReport();
    const textExecution = runRosettaCli(['verify']);
    const jsonExecution = runRosettaCli(['verify', '--json']);
    const jsonOutput: unknown = JSON.parse(jsonExecution.stdout);

    expect(report).toMatchObject({
      checks: {
        bootstrapGate: { errors: [], ok: true },
        receiptBundle: { errors: [], ok: true },
        signedReceipt: { errors: [], ok: true },
      },
      result: 'pass',
      status: 'fixture-backed',
    });
    expect(textExecution).toMatchObject({ exitCode: 0, stderr: '' });
    expect(textExecution.stdout).toContain(
      'Rosetta bootstrap verification: PASS'
    );
    expect(jsonExecution).toMatchObject({ exitCode: 0, stderr: '' });
    expect(jsonOutput).toMatchObject({
      result: 'pass',
      status: 'fixture-backed',
    });
  });

  it('detects deliberate signature-binding and receipt-closure tampering', () => {
    const report = buildRosettaTamperReport();
    const textExecution = runRosettaCli(['tamper']);
    const jsonExecution = runRosettaCli(['tamper', '--json']);
    const jsonOutput: unknown = JSON.parse(jsonExecution.stdout);

    expect(report).toMatchObject({
      checks: {
        missingClosureMember: {
          detected: true,
          verification: {
            errors: [expect.stringContaining('Missing closure member:')],
            ok: false,
          },
        },
        signatureBindingMismatch: {
          detected: true,
          verification: {
            errors: expect.arrayContaining(['Signature CID binding mismatch.']),
            ok: false,
          },
        },
      },
      result: 'pass',
      status: 'fixture-backed',
    });
    expect(textExecution).toMatchObject({ exitCode: 0, stderr: '' });
    expect(textExecution.stdout).toContain(
      'Rosetta tamper-negative proof: PASS'
    );
    expect(textExecution.stdout).toContain(
      'signature CID binding mismatch: DETECTED'
    );
    expect(textExecution.stdout).toContain(
      'missing receipt-bundle closure member: DETECTED'
    );
    expect(jsonExecution).toMatchObject({ exitCode: 0, stderr: '' });
    expect(jsonOutput).toMatchObject({
      result: 'pass',
      status: 'fixture-backed',
    });
  });

  it('provides help without executing the demo', () => {
    const execution = runRosettaCli(['help']);

    expect(execution).toMatchObject({ exitCode: 0, stderr: '' });
    expect(execution.stdout).toContain('Rosetta research workbench');
    expect(execution.stdout).toContain('tamper');
  });

  it('fails visibly for unknown commands, flags, targets, and scenarios', () => {
    const executions = [
      runRosettaCli(['unknown']),
      runRosettaCli(['verify', '--verbose']),
      runRosettaCli(['inspect']),
      runRosettaCli(['inspect', 'unknown']),
      runRosettaCli(['inspect', 'bootstrap-gate', '--scenario=unknown']),
      runRosettaCli(['inspect', 'bootstrap-gate', '--scenario']),
    ];

    for (const execution of executions) {
      expect(execution.exitCode).toBe(2);
      expect(execution.stdout).toBe('');
      expect(execution.stderr).toContain('Rosetta research workbench');
    }
  });
});
