import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';

import { buildBootstrapDemoSnapshot } from '@entif-ai/ingress-refinery';
import { loadBootstrapSourceRegistry } from '@entif-ai/source-registry';

export interface RosettaApiRouteResult {
  body: unknown;
  statusCode: number;
}

const registry = loadBootstrapSourceRegistry();

export function routeRosettaApi(url?: string): RosettaApiRouteResult {
  if (!url) {
    return {
      body: { error: 'missing url' },
      statusCode: 400
    };
  }

  if (url === '/health') {
    return {
      body: { ok: true, service: 'rosetta-api' },
      statusCode: 200
    };
  }

  if (url === '/registry') {
    return {
      body: registry,
      statusCode: 200
    };
  }

  if (url === '/demo') {
    return {
      body: buildBootstrapDemoSnapshot(),
      statusCode: 200
    };
  }

  return {
    body: { error: 'not found' },
    statusCode: 404
  };
}

export function handleRosettaApiRequest(request: IncomingMessage, response: ServerResponse): void {
  const result = routeRosettaApi(request.url);
  response.writeHead(result.statusCode, { 'content-type': 'application/json' });
  response.end(JSON.stringify(result.body, null, 2));
}

export function createRosettaApiServer(): Server {
  return createServer(handleRosettaApiRequest);
}
