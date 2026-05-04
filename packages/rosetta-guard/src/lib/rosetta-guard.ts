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

export interface IamDecisionRequest extends GuardRequest {
  actionId: string;
  envelopeId?: string;
  principalId: string;
  requestedAt: string;
  validUntil?: string;
}

export interface IamDecisionOptions {
  maxTtlSeconds?: number;
  policyVersionSet?: string;
}

export interface IamDecisionBinding {
  action: string;
  actionId: string;
  envelopeId?: string;
  principalId: string;
  resource: string;
}

export interface IamDecisionPayload {
  binding: IamDecisionBinding;
  compatibility: {
    sourceKind: 'guard.decision_token';
    transition: 'projected';
  };
  constraints: Record<string, string>;
  decisionId: string;
  effect: 'allow' | 'deny';
  expiresAt: string;
  issuedAt: string;
  mode: 'live' | 'parse-only';
  policyIds: string[];
  policyVersionSet: string;
  reason: string;
  receiptExpectations: DecisionReceiptExpectation[];
}

export type DecisionReceiptExpectation =
  | 'decision.deny'
  | 'decision.expiry'
  | 'decision.issue'
  | 'decision.revocation'
  | 'decision.validation_failure';

export interface IamDecisionRevocation {
  decisionId: string;
  reason: string;
  revokedAt: string;
}

export interface IamDecisionValidationRequest {
  action: string;
  actionId: string;
  now: string;
  policyVersionSet: string;
  principalId: string;
  resource: string;
  revokedDecisions?: IamDecisionRevocation[];
}

export type IamDecisionValidationReasonCode =
  | 'DECISION_DENIED'
  | 'DECISION_EXPIRED'
  | 'DECISION_REVOKED'
  | 'DECISION_VALID'
  | 'POLICY_VERSION_MISMATCH'
  | 'REQUEST_BINDING_MISMATCH';

export interface IamDecisionValidationResult {
  effect: 'allow' | 'deny';
  incident?: DecisionReceiptExpectation;
  reasonCodes: IamDecisionValidationReasonCode[];
}

export interface ApprovalHandoffRequest {
  action: string;
  actionId: string;
  approvalRequestId: string;
  requestedAt: string;
  timeoutAt: string;
}

export interface ApprovalHandoffPayload extends ApprovalHandoffRequest {
  responseKind: 'iam.decision';
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

export interface WorkflowAdapterRequest {
  adapterId: string;
  capabilityFamily?: string;
  locator?: string;
}

export interface WorkflowEffectRequest {
  effectClass: string;
  effectTier?: string;
  locator?: string;
}

export interface WorkflowPrivilegeRequest {
  locator?: string;
  tier: string;
}

export interface WorkflowStatementRequest {
  family: string;
  locator?: string;
}

export interface WorkflowPolicyArtifact {
  artifactId: string;
  requestedAdapters: WorkflowAdapterRequest[];
  requestedEffects?: WorkflowEffectRequest[];
  requestedPrivilegeTiers?: WorkflowPrivilegeRequest[];
  statements?: WorkflowStatementRequest[];
}

export interface WorkflowPolicyObject {
  allowedStatementFamilies?: string[];
  forbiddenAdapters?: string[];
  forbiddenCapabilityFamilies?: string[];
  forbiddenEffectClasses?: string[];
  forbiddenEffectTiers?: string[];
  forbiddenPrivilegeTiers?: string[];
  policyId: string;
}

export interface WorkflowStartupProfileSnapshot {
  allowedAdapters?: string[];
  allowedCapabilityFamilies?: string[];
  allowedEffectClasses?: string[];
  allowedEffectTiers?: string[];
  allowedPrivilegeTiers?: string[];
}

export interface WorkflowPolicyGateRequest {
  evaluatedAt: string;
  policy: WorkflowPolicyObject;
  policySnapshotId: string;
  startupGrantSnapshotId?: string;
  startupProfile?: WorkflowStartupProfileSnapshot;
  workflow: WorkflowPolicyArtifact;
}

export type WorkflowPolicyViolationCode =
  | 'ADAPTER_FORBIDDEN'
  | 'CAPABILITY_FAMILY_FORBIDDEN'
  | 'EFFECT_CLASS_FORBIDDEN'
  | 'EFFECT_TIER_FORBIDDEN'
  | 'MALFORMED_POLICY'
  | 'PRIVILEGE_TIER_FORBIDDEN'
  | 'STARTUP_AUTHORITY_REJECTION'
  | 'STATEMENT_FAMILY_FORBIDDEN';

export type WorkflowPolicyViolationClass = 'malformed_policy' | 'policy_violation' | 'startup_profile_rejection';

export interface WorkflowPolicyViolation {
  code: WorkflowPolicyViolationCode;
  locator: string;
  message: string;
  metadataRef?: string;
  ruleId: string;
  severity: 'fail_closed';
  source: 'malformed_policy' | 'startup_profile' | 'workflow_policy';
}

export interface WorkflowPolicyDecisionPayload {
  boundaries: {
    executionDecisionValidation: 'separate_iam_decision_required';
    requestPolicyAuthority: 'narrows_startup_authority_only';
  };
  decisionId: string;
  evaluatedAt: string;
  policyIds: string[];
  provenance: {
    evaluatedWorkflowArtifactId: string;
    policySnapshotId: string;
    startupGrantSnapshotId?: string;
  };
  receiptExpectations: DecisionReceiptExpectation[];
  status: 'allowed' | 'denied';
  violationClass?: WorkflowPolicyViolationClass;
  violations: WorkflowPolicyViolation[];
}

function matchesPattern(pattern: string, value: string): boolean {
  return pattern === '*' || value.startsWith(pattern);
}

function parseTimestamp(timestamp: string): number {
  const parsed = Date.parse(timestamp);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid timestamp: ${timestamp}`);
  }

  return parsed;
}

function addSeconds(timestamp: string, seconds: number): string {
  return new Date(parseTimestamp(timestamp) + seconds * 1000).toISOString();
}

function earliestTimestamp(left: string, right: string): string {
  return parseTimestamp(left) <= parseTimestamp(right) ? new Date(parseTimestamp(left)).toISOString() : new Date(parseTimestamp(right)).toISOString();
}

function buildDecisionId(binding: IamDecisionBinding, issuedAt: string): string {
  const raw = `${binding.principalId}:${binding.actionId}:${binding.action}:${binding.resource}:${binding.envelopeId ?? 'local'}:${issuedAt}`;
  return `iam.decision.${raw.replace(/[^a-zA-Z0-9]+/g, '.').replace(/(^\.+|\.+$)/g, '').toLowerCase()}`;
}

function buildWorkflowPolicyDecisionId(workflowArtifactId: string, policySnapshotId: string, evaluatedAt: string): string {
  const raw = `${workflowArtifactId}:${policySnapshotId}:${evaluatedAt}`;
  return `workflow.policy.${raw.replace(/[^a-zA-Z0-9]+/g, '.').replace(/(^\.+|\.+$)/g, '').toLowerCase()}`;
}

function includesDefined(values: string[] | undefined, value: string | undefined): boolean {
  return value !== undefined && (values ?? []).includes(value);
}

function isOutsideAllowedSet(allowed: string[] | undefined, value: string | undefined): boolean {
  return allowed !== undefined && !includesDefined(allowed, value);
}

function addWorkflowViolation(
  violations: WorkflowPolicyViolation[],
  violation: Omit<WorkflowPolicyViolation, 'severity'>
): void {
  violations.push({
    ...violation,
    severity: 'fail_closed'
  });
}

function policyRuleId(policyId: string, field: keyof WorkflowPolicyObject): string {
  return `${policyId}:${field}`;
}

function startupRuleId(field: keyof WorkflowStartupProfileSnapshot): string {
  return `startupProfile:${field}`;
}

function classifyWorkflowPolicyViolations(violations: WorkflowPolicyViolation[]): WorkflowPolicyViolationClass | undefined {
  if (violations.length === 0) {
    return undefined;
  }

  if (violations.some((violation) => violation.source === 'malformed_policy')) {
    return 'malformed_policy';
  }

  if (violations.some((violation) => violation.source === 'startup_profile')) {
    return 'startup_profile_rejection';
  }

  return 'policy_violation';
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

export function issueIamDecision(
  request: IamDecisionRequest,
  rules: GuardRule[],
  options: IamDecisionOptions = {}
): TileEnvelope<IamDecisionPayload> {
  const guardDecision = evaluateGuard(request, rules);
  const binding: IamDecisionBinding = {
    action: request.action,
    actionId: request.actionId,
    ...(request.envelopeId === undefined ? {} : { envelopeId: request.envelopeId }),
    principalId: request.principalId,
    resource: request.resource
  };
  const issuedAt = new Date(parseTimestamp(request.requestedAt)).toISOString();
  const maxTtlExpiresAt = addSeconds(issuedAt, options.maxTtlSeconds ?? 300);
  const expiresAt = request.validUntil === undefined ? maxTtlExpiresAt : earliestTimestamp(request.validUntil, maxTtlExpiresAt);

  return buildTile(
    'iam.decision',
    {
      binding,
      compatibility: {
        sourceKind: 'guard.decision_token',
        transition: 'projected'
      },
      constraints: {},
      decisionId: buildDecisionId(binding, issuedAt),
      effect: guardDecision.payload.effect,
      expiresAt,
      issuedAt,
      mode: request.mode,
      policyIds: guardDecision.payload.policyIds,
      policyVersionSet: options.policyVersionSet ?? 'unversioned',
      reason: guardDecision.payload.reason,
      receiptExpectations: [
        'decision.issue',
        'decision.deny',
        'decision.expiry',
        'decision.revocation',
        'decision.validation_failure'
      ]
    },
    { createdAt: issuedAt, pack: 'rosetta.guard' }
  );
}

export function revokeIamDecision(decisionId: string, reason: string, revokedAt: string): IamDecisionRevocation {
  return {
    decisionId,
    reason,
    revokedAt: new Date(parseTimestamp(revokedAt)).toISOString()
  };
}

export function validateIamDecision(
  decision: TileEnvelope<IamDecisionPayload>,
  request: IamDecisionValidationRequest
): IamDecisionValidationResult {
  if (
    decision.payload.binding.action !== request.action ||
    decision.payload.binding.actionId !== request.actionId ||
    decision.payload.binding.principalId !== request.principalId ||
    decision.payload.binding.resource !== request.resource
  ) {
    return {
      effect: 'deny',
      incident: 'decision.validation_failure',
      reasonCodes: ['REQUEST_BINDING_MISMATCH']
    };
  }

  if (decision.payload.policyVersionSet !== request.policyVersionSet) {
    return {
      effect: 'deny',
      incident: 'decision.validation_failure',
      reasonCodes: ['POLICY_VERSION_MISMATCH']
    };
  }

  if (decision.payload.effect === 'deny') {
    return {
      effect: 'deny',
      incident: 'decision.deny',
      reasonCodes: ['DECISION_DENIED']
    };
  }

  if (parseTimestamp(request.now) > parseTimestamp(decision.payload.expiresAt)) {
    return {
      effect: 'deny',
      incident: 'decision.expiry',
      reasonCodes: ['DECISION_EXPIRED']
    };
  }

  if ((request.revokedDecisions ?? []).some((revocation) => revocation.decisionId === decision.payload.decisionId)) {
    return {
      effect: 'deny',
      incident: 'decision.revocation',
      reasonCodes: ['DECISION_REVOKED']
    };
  }

  return {
    effect: 'allow',
    reasonCodes: ['DECISION_VALID']
  };
}

export function buildApprovalHandoff(request: ApprovalHandoffRequest): TileEnvelope<ApprovalHandoffPayload> {
  return buildTile(
    'iam.approval_handoff',
    {
      ...request,
      responseKind: 'iam.decision'
    },
    { createdAt: request.requestedAt, pack: 'rosetta.guard' }
  );
}

export function evaluateWorkflowPolicyGate(request: WorkflowPolicyGateRequest): TileEnvelope<WorkflowPolicyDecisionPayload> {
  const evaluatedAt = new Date(parseTimestamp(request.evaluatedAt)).toISOString();
  const violations: WorkflowPolicyViolation[] = [];
  const policyId = request.policy.policyId;

  if (policyId.trim() === '') {
    addWorkflowViolation(violations, {
      code: 'MALFORMED_POLICY',
      locator: 'policy.policyId',
      message: 'workflow policy must declare a non-empty policyId',
      ruleId: 'workflowPolicy:policyId',
      source: 'malformed_policy'
    });
  }

  for (const adapter of request.workflow.requestedAdapters) {
    if (includesDefined(request.policy.forbiddenAdapters, adapter.adapterId)) {
      addWorkflowViolation(violations, {
        code: 'ADAPTER_FORBIDDEN',
        locator: adapter.locator ?? request.workflow.artifactId,
        message: `adapter ${adapter.adapterId} is forbidden by workflow policy`,
        metadataRef: adapter.adapterId,
        ruleId: policyRuleId(policyId, 'forbiddenAdapters'),
        source: 'workflow_policy'
      });
    }

    if (includesDefined(request.policy.forbiddenCapabilityFamilies, adapter.capabilityFamily)) {
      addWorkflowViolation(violations, {
        code: 'CAPABILITY_FAMILY_FORBIDDEN',
        locator: adapter.locator ?? request.workflow.artifactId,
        message: `capability family ${adapter.capabilityFamily} is forbidden by workflow policy`,
        metadataRef: adapter.capabilityFamily,
        ruleId: policyRuleId(policyId, 'forbiddenCapabilityFamilies'),
        source: 'workflow_policy'
      });
    }

    if (isOutsideAllowedSet(request.startupProfile?.allowedAdapters, adapter.adapterId)) {
      addWorkflowViolation(violations, {
        code: 'STARTUP_AUTHORITY_REJECTION',
        locator: adapter.locator ?? request.workflow.artifactId,
        message: `adapter ${adapter.adapterId} is outside startup-granted authority`,
        metadataRef: adapter.adapterId,
        ruleId: startupRuleId('allowedAdapters'),
        source: 'startup_profile'
      });
    }

    if (isOutsideAllowedSet(request.startupProfile?.allowedCapabilityFamilies, adapter.capabilityFamily)) {
      addWorkflowViolation(violations, {
        code: 'STARTUP_AUTHORITY_REJECTION',
        locator: adapter.locator ?? request.workflow.artifactId,
        message: `capability family ${adapter.capabilityFamily} is outside startup-granted authority`,
        metadataRef: adapter.capabilityFamily,
        ruleId: startupRuleId('allowedCapabilityFamilies'),
        source: 'startup_profile'
      });
    }
  }

  for (const effect of request.workflow.requestedEffects ?? []) {
    if (includesDefined(request.policy.forbiddenEffectClasses, effect.effectClass)) {
      addWorkflowViolation(violations, {
        code: 'EFFECT_CLASS_FORBIDDEN',
        locator: effect.locator ?? request.workflow.artifactId,
        message: `effect class ${effect.effectClass} is forbidden by workflow policy`,
        metadataRef: effect.effectClass,
        ruleId: policyRuleId(policyId, 'forbiddenEffectClasses'),
        source: 'workflow_policy'
      });
    }

    if (includesDefined(request.policy.forbiddenEffectTiers, effect.effectTier)) {
      addWorkflowViolation(violations, {
        code: 'EFFECT_TIER_FORBIDDEN',
        locator: effect.locator ?? request.workflow.artifactId,
        message: `effect tier ${effect.effectTier} is forbidden by workflow policy`,
        metadataRef: effect.effectTier,
        ruleId: policyRuleId(policyId, 'forbiddenEffectTiers'),
        source: 'workflow_policy'
      });
    }

    if (isOutsideAllowedSet(request.startupProfile?.allowedEffectClasses, effect.effectClass)) {
      addWorkflowViolation(violations, {
        code: 'STARTUP_AUTHORITY_REJECTION',
        locator: effect.locator ?? request.workflow.artifactId,
        message: `effect class ${effect.effectClass} is outside startup-granted authority`,
        metadataRef: effect.effectClass,
        ruleId: startupRuleId('allowedEffectClasses'),
        source: 'startup_profile'
      });
    }

    if (isOutsideAllowedSet(request.startupProfile?.allowedEffectTiers, effect.effectTier)) {
      addWorkflowViolation(violations, {
        code: 'STARTUP_AUTHORITY_REJECTION',
        locator: effect.locator ?? request.workflow.artifactId,
        message: `effect tier ${effect.effectTier} is outside startup-granted authority`,
        metadataRef: effect.effectTier,
        ruleId: startupRuleId('allowedEffectTiers'),
        source: 'startup_profile'
      });
    }
  }

  for (const privilege of request.workflow.requestedPrivilegeTiers ?? []) {
    if (includesDefined(request.policy.forbiddenPrivilegeTiers, privilege.tier)) {
      addWorkflowViolation(violations, {
        code: 'PRIVILEGE_TIER_FORBIDDEN',
        locator: privilege.locator ?? request.workflow.artifactId,
        message: `privilege tier ${privilege.tier} is forbidden by workflow policy`,
        metadataRef: privilege.tier,
        ruleId: policyRuleId(policyId, 'forbiddenPrivilegeTiers'),
        source: 'workflow_policy'
      });
    }

    if (isOutsideAllowedSet(request.startupProfile?.allowedPrivilegeTiers, privilege.tier)) {
      addWorkflowViolation(violations, {
        code: 'STARTUP_AUTHORITY_REJECTION',
        locator: privilege.locator ?? request.workflow.artifactId,
        message: `privilege tier ${privilege.tier} is outside startup-granted authority`,
        metadataRef: privilege.tier,
        ruleId: startupRuleId('allowedPrivilegeTiers'),
        source: 'startup_profile'
      });
    }
  }

  for (const statement of request.workflow.statements ?? []) {
    if (isOutsideAllowedSet(request.policy.allowedStatementFamilies, statement.family)) {
      addWorkflowViolation(violations, {
        code: 'STATEMENT_FAMILY_FORBIDDEN',
        locator: statement.locator ?? request.workflow.artifactId,
        message: `statement family ${statement.family} is not allowed by workflow policy`,
        metadataRef: statement.family,
        ruleId: policyRuleId(policyId, 'allowedStatementFamilies'),
        source: 'workflow_policy'
      });
    }
  }

  const violationClass = classifyWorkflowPolicyViolations(violations);
  const status: WorkflowPolicyDecisionPayload['status'] = violations.length === 0 ? 'allowed' : 'denied';
  const receiptExpectations: DecisionReceiptExpectation[] = [
    'decision.issue',
    'decision.deny',
    'decision.validation_failure'
  ];

  return buildTile(
    'workflow.policy_decision',
    {
      boundaries: {
        executionDecisionValidation: 'separate_iam_decision_required',
        requestPolicyAuthority: 'narrows_startup_authority_only'
      },
      decisionId: buildWorkflowPolicyDecisionId(request.workflow.artifactId, request.policySnapshotId, evaluatedAt),
      evaluatedAt,
      policyIds: [policyId],
      provenance: {
        evaluatedWorkflowArtifactId: request.workflow.artifactId,
        policySnapshotId: request.policySnapshotId,
        ...(request.startupGrantSnapshotId === undefined ? {} : { startupGrantSnapshotId: request.startupGrantSnapshotId })
      },
      receiptExpectations,
      status,
      ...(violationClass === undefined ? {} : { violationClass }),
      violations
    },
    { createdAt: evaluatedAt, pack: 'rosetta.guard' }
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
