import { buildTile, type TileEnvelope } from '@entif-ai/rosetta-core';

export interface GuardRule {
  actionPattern: string;
  effect: 'allow' | 'deny';
  id: string;
  mode?: 'live' | 'parse-only';
  resourcePattern: string;
}

export interface GuardRequest {
  action: string;
  mode: 'live' | 'parse-only';
  resource: string;
  sideEffect: boolean;
}

export interface GuardDecisionPayload {
  action: string;
  effect: 'allow' | 'deny';
  expiresAt: string;
  mode: 'live' | 'parse-only';
  policyIds: string[];
  reason: string;
  resource: string;
  tokenId: string;
}

function matchesPattern(pattern: string, value: string): boolean {
  return pattern === '*' || value.startsWith(pattern);
}

export function evaluateGuard(request: GuardRequest, rules: GuardRule[]): TileEnvelope<GuardDecisionPayload> {
  const matched = rules.find(
    (rule) =>
      matchesPattern(rule.actionPattern, request.action) &&
      matchesPattern(rule.resourcePattern, request.resource) &&
      (rule.mode === undefined || rule.mode === request.mode)
  );

  const effect: GuardDecisionPayload['effect'] =
    matched?.effect ?? (request.sideEffect && request.mode === 'parse-only' ? 'deny' : 'allow');
  const reason =
    matched?.id ??
    (request.sideEffect && request.mode === 'parse-only'
      ? 'parse-only default denies side effects without an explicit allow rule'
      : 'no explicit deny rule matched');

  return buildTile(
    'guard.decision_token',
    {
      action: request.action,
      effect,
      expiresAt: new Date('2026-04-13T01:00:00.000Z').toISOString(),
      mode: request.mode,
      policyIds: matched ? [matched.id] : ['guard.parse-only-default'],
      reason,
      resource: request.resource,
      tokenId: `guard.${request.action}.${effect}`
    },
    { pack: 'rosetta.guard' }
  );
}
