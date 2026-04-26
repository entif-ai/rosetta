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

  it('rejects missing or unknown routes', () => {
    expect(routeRosettaApi(undefined)).toMatchObject({ statusCode: 400 });
    expect(routeRosettaApi('/missing')).toMatchObject({ statusCode: 404 });
  });
});
