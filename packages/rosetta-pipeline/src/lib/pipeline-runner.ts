/**
 * pipeline-runner — orchestrates Rosetta semantic layers end-to-end.
 */
import {
  buildTile,
  createAction,
  createEvaluation,
  type TileEnvelope,
} from "../../../rosetta-core/src/index.js";
import { evaluateGuard, type GuardDecisionPayload, type GuardRule } from "../../../rosetta-guard/src/index.js";
import {
  createReceipt,
  digestTile,
  type ReceiptPayload,
} from "../../../rosetta-receipts/src/index.js";
import { runConceptLayer } from "./concept-layer.js";
import { runFormLayer } from "./form-layer.js";
import { runFrameLayer } from "./frame-layer.js";
import { runLexemeLayer } from "./lexeme-layer.js";
import { PipelineContext } from "./pipeline-context.js";
import type { PipelineOptions, PipelineResult } from "./pipeline-types.js";

const DEFAULT_GUARD_RULES: GuardRule[] = [
  {
    actionPattern: "pipeline.",
    effect: "allow",
    id: "policy.pipeline.parse-only",
    mode: "parse-only",
    resourcePattern: "workspace://rosetta-pipeline",
  },
];

export interface PipelineRuntimeResult extends PipelineResult {
  ctx: PipelineContext;
  guardTokens: TileEnvelope<GuardDecisionPayload>[];
  receipts: TileEnvelope<ReceiptPayload>[];
  resultTile?: TileEnvelope<unknown>;
  runTile: TileEnvelope<unknown>;
  trace: TileEnvelope<unknown>[];
}

export function runPipeline(
  observation: TileEnvelope<unknown>,
  options: PipelineOptions = {}
): PipelineResult {
  const ctx = new PipelineContext(observation, options);
  const runTile = buildTile("rosetta.run", {
    runId: ctx.runId,
    summary: "Rosetta pipeline execution.",
    tags: ["rosetta-pipeline", ctx.options.language],
  });
  const actionTile = createAction(runTile.cid, "Execute Rosetta semantic pipeline.");
  const guardTokens: TileEnvelope<GuardDecisionPayload>[] = [];
  const receipts: TileEnvelope<ReceiptPayload>[] = [];
  const toolCallTiles: TileEnvelope<unknown>[] = [];

  ctx.addToTrace(runTile);
  ctx.addToTrace(actionTile);

  try {
    const formGuard = guardLayer("form", ctx, guardTokens);
    if (formGuard.payload.effect === "deny") {
      return deniedResult(ctx, runTile, actionTile, guardTokens, receipts, toolCallTiles, formGuard);
    }
    const L1 = runFormLayer(ctx);
    receipts.push(mintLayerReceipt("form", L1.forms, [observation, formGuard], ctx));

    const lexemeGuard = guardLayer("lexeme", ctx, guardTokens);
    if (lexemeGuard.payload.effect === "deny") {
      return deniedResult(ctx, runTile, actionTile, guardTokens, receipts, toolCallTiles, lexemeGuard);
    }
    const L2 = runLexemeLayer(ctx);
    receipts.push(mintLayerReceipt("lexeme", [...L2.lexemes, ...L2.conjectures], [...L1.forms, lexemeGuard], ctx));

    const conceptGuard = guardLayer("concept", ctx, guardTokens);
    if (conceptGuard.payload.effect === "deny") {
      return deniedResult(ctx, runTile, actionTile, guardTokens, receipts, toolCallTiles, conceptGuard);
    }
    const conceptResult = runConceptLayer(ctx);
    receipts.push(
      mintLayerReceipt(
        "concept",
        [...conceptResult.concepts, ...conceptResult.conjectures, ...conceptResult.edges],
        [...L2.lexemes, conceptGuard],
        ctx
      )
    );

    const frameGuard = guardLayer("frame", ctx, guardTokens);
    if (frameGuard.payload.effect === "deny") {
      return deniedResult(ctx, runTile, actionTile, guardTokens, receipts, toolCallTiles, frameGuard);
    }
    const frameResult = runFrameLayer(ctx);
    receipts.push(
      mintLayerReceipt(
        "frame",
        [...frameResult.frames, ...frameResult.conjectures],
        [...conceptResult.concepts, ...conceptResult.edges, frameGuard],
        ctx
      )
    );
  } catch (error) {
    ctx.addError("pipeline", error instanceof Error ? error.message : String(error));
  }

  const resultTile =
    ctx.L3?.frames[0] ??
    ctx.L3?.concepts[0] ??
    ctx.L2?.lexemes[0] ??
    ctx.L1?.forms[0] ??
    observation;

  const evaluationTile = createEvaluation(
    ctx.hasErrors ? "Rosetta pipeline completed with recoverable errors." : "Rosetta pipeline completed successfully.",
    ctx.hasErrors ? "partial" : "pass",
    [resultTile.cid]
  );
  ctx.addToTrace(evaluationTile);

  const result: PipelineRuntimeResult = {
    actionTile,
    ctx,
    errors: [...ctx.errors],
    evaluationTile,
    guardTokens,
    layers: {
      L0: ctx.L0,
      L1: ctx.L1,
      L2: ctx.L2,
      L3: ctx.L3,
      L4: ctx.L4,
    },
    observationCid: observation.cid,
    receipts,
    responseTile: resultTile,
    resultTile,
    runId: ctx.runId,
    runTile,
    toolCallTiles,
    trace: [...ctx.trace],
  };

  return result;
}

function deniedResult(
  ctx: PipelineContext,
  runTile: TileEnvelope<unknown>,
  actionTile: TileEnvelope<unknown>,
  guardTokens: TileEnvelope<GuardDecisionPayload>[],
  receipts: TileEnvelope<ReceiptPayload>[],
  toolCallTiles: TileEnvelope<unknown>[],
  deniedToken: TileEnvelope<GuardDecisionPayload>
): PipelineResult {
  ctx.addError("guard", deniedToken.payload.reason);
  const evaluationTile = createEvaluation("Rosetta pipeline halted by guard policy.", "deny", [deniedToken.cid]);
  ctx.addToTrace(evaluationTile);

  const result: PipelineRuntimeResult = {
    actionTile,
    ctx,
    errors: [...ctx.errors],
    evaluationTile,
    guardTokens,
    layers: {
      L0: ctx.L0,
      L1: ctx.L1,
      L2: ctx.L2,
      L3: ctx.L3,
      L4: ctx.L4,
    },
    observationCid: ctx.observation.cid,
    receipts,
    responseTile: deniedToken,
    resultTile: deniedToken,
    runId: ctx.runId,
    runTile,
    toolCallTiles,
    trace: [...ctx.trace],
  };

  return result;
}

function guardLayer(
  layerName: string,
  ctx: PipelineContext,
  guardTokens: TileEnvelope<GuardDecisionPayload>[]
): TileEnvelope<GuardDecisionPayload> {
  const token = evaluateGuard(
    {
      action: `pipeline.${layerName}`,
      mode: "parse-only",
      resource: "workspace://rosetta-pipeline",
      sideEffect: false,
    },
    DEFAULT_GUARD_RULES
  );
  guardTokens.push(token);
  ctx.addToTrace(token);
  return token;
}

function mintLayerReceipt(
  layerName: string,
  subjects: TileEnvelope<unknown>[],
  evidence: TileEnvelope<unknown>[],
  ctx: PipelineContext
): TileEnvelope<ReceiptPayload> {
  const fallbackSubject = subjects[0] ?? evidence[0] ?? ctx.observation;
  const safeSubjects = subjects.length > 0 ? subjects : [fallbackSubject];
  const receipt = createReceipt({
    claims: [
      {
        claimType: "rrp:claim.pipeline-layer",
        confidence: 0.9,
        evidence: evidence.slice(0, 8).map((tile) => ({ cid: tile.cid })),
        statement: `Pipeline layer ${layerName} completed.`,
        verdict: "pass",
      },
    ],
    digests: safeSubjects.slice(0, 8).map((tile) => digestTile(tile, `${layerName}-subject`)),
    policyRefs: evidence
      .filter((tile) => tile.kind === "guard.decision_token")
      .map((tile) => tile.cid),
    receiptType: `rrp:pipeline.${layerName}`,
    subjects: safeSubjects.slice(0, 8).map((tile) => ({
      cid: tile.cid,
      role: `pipeline:${layerName}:subject`,
    })),
  });
  ctx.addToTrace(receipt);
  return receipt;
}
