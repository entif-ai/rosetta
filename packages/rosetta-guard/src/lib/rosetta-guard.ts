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

export interface PrivacyBudgetField {
  dataClass: 'financial' | 'phi' | 'pii' | 'proprietary';
  field: string;
  risk: number;
}

export interface PrivacyBudgetCorrelationGroup {
  fields: string[];
  groupId: string;
  risk: number;
}

export interface PrivacyBudgetBoundaryRule {
  dataClass: PrivacyBudgetField['dataClass'];
  deniedCombinations: string[][];
}

export interface PrivacyBudgetTrafficPattern {
  frequencyRisk: number;
  window: string;
}

export type PrivacyBudgetReasonCode =
  | 'DENIED_FIELD_COMBINATION'
  | 'PRIVACY_BUDGET_EXCEEDED'
  | 'PRIVACY_BUDGET_OK'
  | 'TRAFFIC_PATTERN_RISK';

export interface PrivacyBudgetRequest {
  boundaryRules?: PrivacyBudgetBoundaryRule[];
  correlationGroups?: PrivacyBudgetCorrelationGroup[];
  fields: PrivacyBudgetField[];
  maxCumulativeRisk: number;
  trafficPattern?: PrivacyBudgetTrafficPattern;
}

export interface PrivacyBudgetDisclosureUnit {
  fields: string[];
  id: string;
  risk: number;
}

export interface PrivacyBudgetDecision {
  cumulativeRisk: number;
  disclosureUnits: PrivacyBudgetDisclosureUnit[];
  effect: 'allow' | 'deny';
  reasonCodes: PrivacyBudgetReasonCode[];
}

export type SocialEngineeringReasonCode =
  | 'AUTHORITY_CUE'
  | 'DATA_EXPORT_REQUEST'
  | 'PROCEDURAL_BYPASS'
  | 'SECRECY_FRAMING'
  | 'SENSITIVE_ACTION_REQUEST'
  | 'SOCIAL_ENGINEERING_LOW'
  | 'URGENCY_PRESSURE'
  | 'VERIFICATION_SUPPRESSION';

export interface SocialEngineeringRiskRequest {
  attackFamilyRisk: number;
  autonomousAction?: boolean;
  message: string;
  sensitiveActionRisk: number;
}

export interface SocialEngineeringRiskDecision {
  action: 'allow' | 'approval_required' | 'quarantine';
  attackFamilyRisk: number;
  reasonCodes: SocialEngineeringReasonCode[];
  sensitiveActionRisk: number;
  socialEngineeringRisk: number;
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

export function evaluatePrivacyBudget(request: PrivacyBudgetRequest): PrivacyBudgetDecision {
  const correlatedFields = new Set(request.correlationGroups?.flatMap((group) => group.fields) ?? []);
  const disclosureUnits: PrivacyBudgetDisclosureUnit[] = [
    ...(request.correlationGroups ?? []).map((group) => ({
      fields: [...group.fields],
      id: group.groupId,
      risk: group.risk
    })),
    ...request.fields
      .filter((field) => !correlatedFields.has(field.field))
      .map((field) => ({
        fields: [field.field],
        id: field.field,
        risk: field.risk
      }))
  ];

  const trafficRisk = request.trafficPattern?.frequencyRisk ?? 0;
  const cumulativeRisk = disclosureUnits.reduce((sum, unit) => sum + unit.risk, trafficRisk);
  const reasonCodes: PrivacyBudgetReasonCode[] = [];

  if (cumulativeRisk > request.maxCumulativeRisk) {
    reasonCodes.push('PRIVACY_BUDGET_EXCEEDED');
  }

  if (trafficRisk > 0 && cumulativeRisk > request.maxCumulativeRisk) {
    reasonCodes.push('TRAFFIC_PATTERN_RISK');
  }

  const fieldNamesByDataClass = new Map<PrivacyBudgetField['dataClass'], Set<string>>();
  for (const field of request.fields) {
    const fieldNames = fieldNamesByDataClass.get(field.dataClass) ?? new Set<string>();
    fieldNames.add(field.field);
    fieldNamesByDataClass.set(field.dataClass, fieldNames);
  }

  for (const rule of request.boundaryRules ?? []) {
    const fieldNames = fieldNamesByDataClass.get(rule.dataClass) ?? new Set<string>();
    if (rule.deniedCombinations.some((combination) => combination.every((field) => fieldNames.has(field)))) {
      reasonCodes.push('DENIED_FIELD_COMBINATION');
      break;
    }
  }

  if (reasonCodes.length === 0) {
    reasonCodes.push('PRIVACY_BUDGET_OK');
  }

  return {
    cumulativeRisk,
    disclosureUnits,
    effect: reasonCodes.includes('PRIVACY_BUDGET_OK') ? 'allow' : 'deny',
    reasonCodes
  };
}

export function evaluateSocialEngineeringRisk(request: SocialEngineeringRiskRequest): SocialEngineeringRiskDecision {
  const message = request.message.toLowerCase();
  const reasonCodes: SocialEngineeringReasonCode[] = [];

  if (/\b(urgent|asap|immediately|quick favor|now)\b/u.test(message)) {
    reasonCodes.push('URGENCY_PRESSURE');
  }
  if (/\b(i am your manager|manager|boss|ceo|authority)\b/u.test(message)) {
    reasonCodes.push('AUTHORITY_CUE');
  }
  if (/\b(confidential|do not tell anyone|don't tell anyone|off the books)\b/u.test(message)) {
    reasonCodes.push('SECRECY_FRAMING');
  }
  if (/\b(skip the normal approval process|skip normal approval|override procedure|bypass)\b/u.test(message)) {
    reasonCodes.push('PROCEDURAL_BYPASS');
  }
  if (/\b(just trust me|don't verify|do not verify|no need to check)\b/u.test(message)) {
    reasonCodes.push('VERIFICATION_SUPPRESSION');
  }
  if (/\b(wire|funds|credential|password|payment)\b/u.test(message)) {
    reasonCodes.push('SENSITIVE_ACTION_REQUEST');
  }
  if (/\b(export the customer list|customer list|data export|export data)\b/u.test(message)) {
    reasonCodes.push('DATA_EXPORT_REQUEST');
  }

  if (reasonCodes.length === 0) {
    reasonCodes.push('SOCIAL_ENGINEERING_LOW');
  }

  const positiveSignalCount = reasonCodes.includes('SOCIAL_ENGINEERING_LOW') ? 0 : reasonCodes.length;
  const socialEngineeringRisk = Math.min(1, positiveSignalCount * 0.25 + request.sensitiveActionRisk * 0.2);
  const highSocialRisk = socialEngineeringRisk >= 0.65;
  const highSensitiveActionRisk = request.sensitiveActionRisk >= 0.7;

  const action =
    highSocialRisk && highSensitiveActionRisk && request.autonomousAction
      ? 'quarantine'
      : highSocialRisk && highSensitiveActionRisk
        ? 'approval_required'
        : 'allow';

  return {
    action,
    attackFamilyRisk: request.attackFamilyRisk,
    reasonCodes,
    sensitiveActionRisk: request.sensitiveActionRisk,
    socialEngineeringRisk
  };
}
