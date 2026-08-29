import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from 'node:http';
import { URL } from 'node:url';

import {
  BOOTSTRAP_GATE_INSPECTION_SCENARIOS,
  buildBootstrapDemoSnapshot,
  buildBootstrapGateInspectionReport,
  isBootstrapGateInspectionScenario,
} from '@entif-ai/ingress-refinery';
import { listSchemaCatalogEntries } from '@entif-ai/rosetta-schemas';
import { loadBootstrapSourceRegistry } from '@entif-ai/source-registry';

export interface RosettaApiRouteResult {
  body: unknown;
  statusCode: number;
}

const registry = loadBootstrapSourceRegistry();

function parseRequestUrl(url: string): URL | null {
  try {
    return new URL(url, 'http://rosetta.local');
  } catch {
    return null;
  }
}

export function routeRosettaApi(url?: string): RosettaApiRouteResult {
  if (!url) {
    return {
      body: { error: 'missing url' },
      statusCode: 400,
    };
  }

  const requestUrl = parseRequestUrl(url);
  if (!requestUrl) {
    return {
      body: { error: 'invalid url' },
      statusCode: 400,
    };
  }

  if (requestUrl.pathname === '/health') {
    return {
      body: { ok: true, service: 'rosetta-api' },
      statusCode: 200,
    };
  }

  if (requestUrl.pathname === '/registry') {
    return {
      body: registry,
      statusCode: 200,
    };
  }

  if (requestUrl.pathname === '/demo') {
    return {
      body: buildBootstrapDemoSnapshot(),
      statusCode: 200,
    };
  }

  if (requestUrl.pathname === '/inspect/bootstrap-gate') {
    const scenario = requestUrl.searchParams.get('scenario') ?? 'pass';
    if (!isBootstrapGateInspectionScenario(scenario)) {
      return {
        body: {
          acceptedScenarios: BOOTSTRAP_GATE_INSPECTION_SCENARIOS,
          error: `unsupported bootstrap gate scenario: ${scenario}`,
        },
        statusCode: 400,
      };
    }

    return {
      body: buildBootstrapGateInspectionReport(scenario),
      statusCode: 200,
    };
  }

  if (requestUrl.pathname === '/schemas') {
    return {
      body: {
        entries: listSchemaCatalogEntries(),
        note: 'Inspection endpoint only; exposureStatus values describe catalog visibility and do not imply runtime support.',
      },
      statusCode: 200,
    };
  }

  return {
    body: { error: 'not found' },
    statusCode: 404,
  };
}

export function handleRosettaApiRequest(
  request: IncomingMessage,
  response: ServerResponse
): void {
  const result = routeRosettaApi(request.url);
  response.writeHead(result.statusCode, { 'content-type': 'application/json' });
  response.end(JSON.stringify(result.body, null, 2));
}

export function createRosettaApiServer(): Server {
  return createServer(handleRosettaApiRequest);
}
