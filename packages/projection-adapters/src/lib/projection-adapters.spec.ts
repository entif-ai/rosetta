import { describe, expect, it } from 'vitest';

import { buildBootstrapDemoSnapshot, createIngressJob } from '@entif-ai/ingress-refinery';

import { projectToMissionControl, projectToOb1Sidecar, projectToPrismShadow } from './projection-adapters.js';

describe('projection-adapters', () => {
  it('keeps OB1 projections read-only', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    const projection = projectToOb1Sidecar(snapshot.canonicalArtifact, snapshot.receiptBundle);

    expect(projection.mutable).toBe(false);
    expect(projection.target).toBe('ob1');
  });

  it('keeps Prism in shadow mode', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    const projection = projectToPrismShadow(snapshot.canonicalArtifact, snapshot.trustMatrix, snapshot.receiptBundle);

    expect(projection.viewMode).toBe('shadow-memory');
  });

  it('treats Mission Control as an operator shell projection', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    const job = createIngressJob(snapshot.record.cid, snapshot.manifestation.cid);
    const projection = projectToMissionControl(snapshot.canonicalArtifact, job, snapshot.receiptBundle);

    expect(projection.viewMode).toBe('operator-shell');
  });
});
