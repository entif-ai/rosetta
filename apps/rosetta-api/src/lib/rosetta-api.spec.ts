import { describe, expect, it } from 'vitest';

import { routeRosettaApi } from './rosetta-api.js';

describe('rosetta-api', () => {
  it('serves health status', () => {
    const result = routeRosettaApi('/health');

    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchObject({ ok: true, service: 'rosetta-api' });
  });

  it('serves the bootstrap registry', () => {
    const result = routeRosettaApi('/registry');

    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchObject({
      entries: expect.any(Array),
      profiles: expect.any(Array)
    });
  });

  it('serves the bootstrap demo snapshot', () => {
    const result = routeRosettaApi('/demo');

    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchObject({
      conformanceBundle: {
        summary: { violations: 0 }
      },
      receiptBundle: {
        subjectCids: expect.any(Array)
      },
      signedReceipt: {
        receipt: {
          kind: 'rosetta.receipt'
        }
      }
    });
  });

  it('serves the schema catalog as an inspection surface without changing exposure labels', () => {
    const result = routeRosettaApi('/schemas');

    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchObject({
      entries: expect.arrayContaining([
        expect.objectContaining({
          exposureStatus: 'downstream-contract',
          schemaId: 'entif.agentic-messaging.envelope.v1'
        }),
        expect.objectContaining({
          exposureStatus: 'reserved-interface',
          schemaId: 'entif.iam.decision.ref'
        })
      ])
    });
  });

  it('rejects missing or unknown routes', () => {
    expect(routeRosettaApi(undefined)).toMatchObject({ statusCode: 400 });
    expect(routeRosettaApi('/missing')).toMatchObject({ statusCode: 404 });
  });
});
