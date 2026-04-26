import { describe, expect, it } from "vitest";

import { createFrame, createObservation } from "../../../rosetta-core/src/index.js";
import {
  PipelineContext,
  runConceptLayer,
  runEpistemeLayer,
  runFormLayer,
  runFrameLayer,
  runLexemeLayer,
} from "../index.js";
import { entiSkillFromFrame, observationFromToolResult } from "./enti-skill.js";
import { runPipeline } from "./pipeline-runner.js";

describe("rosetta-pipeline", () => {
  it("initializes pipeline context defaults and tracks trace/errors/layer count", () => {
    const observation = createObservation("user", "Hello");
    const ctx = new PipelineContext(observation, {
      emitConjectures: false,
      language: "en-US",
      runId: "run.context-contract",
    });

    expect(ctx.runId).toBe("run.context-contract");
    expect(ctx.options).toMatchObject({
      emitConjectures: false,
      language: "en-US",
      maxFrameSlots: 10,
      maxLexemeCandidates: 5,
      runId: "run.context-contract",
    });
    expect(ctx.L0?.tile).toBe(observation);
    expect(ctx.layerCount).toBe(1);
    expect(ctx.trace).toEqual([observation]);

    ctx.addError("test", "expected failure");
    expect(ctx.hasErrors).toBe(true);
    expect(ctx.errors).toEqual(["[test] expected failure"]);
  });

  it("transforms explicit layer inputs into expected layer outputs", () => {
    const observation = createObservation("user", "Light bank 2026-04-24!");
    const ctx = new PipelineContext(observation, {
      language: "en",
      runId: "run.layer-contract",
    });

    const forms = runFormLayer(ctx);
    expect(ctx.L1).toBe(forms);
    expect(forms.observationCid).toBe(observation.cid);
    expect(forms.forms.map((form) => form.kind)).toEqual([
      "rosetta.form.token",
      "rosetta.form.token",
      "rosetta.form.datetime",
      "rosetta.form.token",
    ]);
    expect(forms.forms.map((form) => (form.payload as { surface?: string; rawText?: string }).surface ?? (form.payload as { rawText: string }).rawText)).toEqual([
      "Light",
      "bank",
      "2026-04-24",
      "!",
    ]);

    const lexemes = runLexemeLayer(ctx);
    expect(ctx.L2).toBe(lexemes);
    expect(lexemes.formCids).toHaveLength(2);
    expect(lexemes.lexemes.map((lexeme) => (lexeme.payload as { lemma: string }).lemma)).toEqual(["light", "bank"]);
    expect(lexemes.lexemes.every((lexeme) => lexeme.kind === "rosetta.lexeme")).toBe(true);
    expect(lexemes.conjectures.map((conjecture) => (conjecture.payload as { method: string }).method)).toEqual([
      "common_word_lookup",
      "common_word_lookup",
    ]);

    const concepts = runConceptLayer(ctx);
    expect(ctx.L3).toBe(concepts);
    expect(concepts.concepts.map((concept) => (concept.payload as { label: string }).label)).toEqual(["light", "bank"]);
    expect(concepts.concepts.every((concept) => concept.kind === "rosetta.concept")).toBe(true);
    expect(concepts.latticeEdges).toHaveLength(concepts.concepts.length);
    expect(concepts.latticeEdges.every((edge) => (edge.payload as { relation: string }).relation === "instance_of")).toBe(true);
    expect(concepts.conjectures).toEqual(lexemes.conjectures);

    const framedConcepts = runFrameLayer(ctx);
    expect(ctx.L3).toBe(framedConcepts);
    expect(framedConcepts.frames).toHaveLength(1);
    expect((framedConcepts.frames[0].payload as { frameType: string }).frameType).toBe("QuestionFrame");
    expect(((framedConcepts.frames[0].payload as { roles: Array<{ roleName: string }> }).roles).map((role) => role.roleName)).toEqual(["query", "topic"]);

    const episteme = runEpistemeLayer(ctx);
    expect(ctx.L4).toBe(episteme);
    expect(episteme.episteme?.kind).toBe("rosetta.episteme");
    expect((episteme.episteme?.payload as { mode: string }).mode).toBe("INFERENTIAL");
    expect((episteme.episteme?.payload as { supportingEvidenceCids: string[] }).supportingEvidenceCids).toEqual([
      ...framedConcepts.concepts.map((concept) => concept.cid),
      ...framedConcepts.frames.map((frame) => frame.cid),
      ...framedConcepts.latticeEdges.map((edge) => edge.cid),
    ]);
    expect(episteme.matrix?.kind).toBe("rosetta.matrix");
    expect((episteme.matrix?.payload as { subjectCid: string }).subjectCid).toBe(observation.cid);
  });

  it("rejects layers when their required prior context is missing", () => {
    const observation = createObservation("user", "Hello");
    const ctx = new PipelineContext(observation);

    expect(() => runLexemeLayer(ctx)).toThrow("L1 (forms) not available");
    expect(() => runConceptLayer(ctx)).toThrow("L2 (lexemes) not available");
    expect(() => runFrameLayer(ctx)).toThrow("L3 (concepts) not available");
    expect(() => runEpistemeLayer(ctx)).toThrow("L3 (concepts/frames) not available");
  });

  it("resolves a capital question into a capital relation frame", () => {
    const observation = createObservation("user", "What is the capital of France?");
    const result = runPipeline(observation);
    const frames = result.layers.L3?.frames ?? [];
    const capitalFrame = frames.find((frame) => frame.kind === "rosetta.frame" && (frame.payload as { frameType: string }).frameType === "CapitalRelationFrame");

    expect(capitalFrame).toBeDefined();
    expect(result.errors).toHaveLength(0);

    const roles = (capitalFrame?.payload as { roles: Array<{ roleName: string; filledBy?: unknown[]; variable?: boolean }> }).roles ?? [];
    const countryRole = roles.find((role) => role.roleName === "country");
    const capitalRole = roles.find((role) => role.roleName === "capital");

    expect(countryRole?.filledBy?.length).toBe(1);
    expect(capitalRole?.variable).toBe(true);

    const plan = capitalFrame ? entiSkillFromFrame(capitalFrame) : null;
    expect(plan?.skillName).toBe("knowledge.capital_lookup");
    expect(plan?.input.answerRole).toBe("capital");
  });

  it("assembles a complete pipeline result with all populated layers", () => {
    const observation = createObservation("user", "Light bank?");
    const result = runPipeline(observation, {
      language: "en",
      runId: "run.pipeline-contract",
    });

    expect(result.runId).toBe("run.pipeline-contract");
    expect(result.observationCid).toBe(observation.cid);
    expect(result.errors).toEqual([]);
    expect(result.toolCallTiles).toEqual([]);
    expect(result.layers.L0?.tile).toBe(observation);
    expect(result.layers.L1?.forms.length).toBeGreaterThan(0);
    expect(result.layers.L2?.lexemes.length).toBeGreaterThan(0);
    expect(result.layers.L3?.concepts.length).toBeGreaterThan(0);
    expect(result.layers.L3?.frames.length).toBe(1);
    expect(result.layers.L4?.episteme?.kind).toBe("rosetta.episteme");
    expect(result.layers.L4?.matrix?.kind).toBe("rosetta.matrix");
  });

  it("keeps non-capital multi-concept questions as open question frames", () => {
    const observation = createObservation("user", "How does light work?");
    const result = runPipeline(observation);
    const frames = result.layers.L3?.frames ?? [];
    const questionFrame = frames.find((frame) => frame.kind === "rosetta.frame" && (frame.payload as { frameType: string }).frameType === "QuestionFrame");

    expect(questionFrame).toBeDefined();
    expect(frames.some((frame) => (frame.payload as { frameType: string }).frameType === "CapitalRelationFrame")).toBe(false);

    const roles = (questionFrame?.payload as { roles: Array<{ roleName: string; variable?: boolean }> }).roles ?? [];
    expect(roles.map((role) => role.roleName)).toEqual(["query", "topic"]);
    expect(roles.every((role) => role.variable)).toBe(true);
    expect(result.layers.L3?.conjectures.length).toBeGreaterThan(0);
  });

  it("turns tool output into a Rosetta observation", () => {
    const observation = observationFromToolResult("knowledge.graph.lookup", {
      capital: "Paris",
      country: "France",
    });

    expect(observation.kind).toBe("rosetta.observation");
    expect((observation.payload as { source: string }).source).toBe("knowledge.graph.lookup");
    expect((observation.payload as { signal: string }).signal).toContain("France");
  });

  it("maps supported frame types into skill invocations", () => {
    const countryCid = "cid.country";
    const entityFrame = createFrame(
      "EntityLookupFrame",
      [{ roleName: "entity", required: true, expectedType: "rosetta.concept", filledBy: [countryCid] }],
      [countryCid]
    );
    const greetingFrame = createFrame("GreetingFrame", [], []);
    const questionFrame = createFrame(
      "QuestionFrame",
      [{ roleName: "answer", required: false, expectedType: "rosetta.concept", variable: true }],
      []
    );

    expect(entiSkillFromFrame(entityFrame)?.skillName).toBe("knowledge.entity_lookup");
    expect(entiSkillFromFrame(greetingFrame)?.skillName).toBe("conversation.greeting");

    const questionSkill = entiSkillFromFrame(questionFrame);
    expect(questionSkill?.skillName).toBe("reasoning.answer_question");
    expect(questionSkill?.input.variableRoles).toEqual(["answer"]);

    expect(entiSkillFromFrame(createFrame("UnsupportedFrame", [], []))).toBeNull();
    expect(entiSkillFromFrame(createObservation("user", "not a frame"))).toBeNull();
  });

  it("summarizes tool results deterministically for observations", () => {
    const preferredSummary = observationFromToolResult("lookup", {
      ignored: "value",
      summary: "preferred summary",
    });
    expect((preferredSummary.payload as { signal: string }).signal).toBe("lookup: preferred summary");

    const stableObject = observationFromToolResult("lookup", {
      z: 1,
      a: "first",
    });
    expect((stableObject.payload as { signal: string }).signal).toBe('lookup: {"a":"first","z":1}');

    const longObservation = observationFromToolResult("lookup", "x".repeat(1300));
    expect((longObservation.payload as { signal: string }).signal).toHaveLength(1200);
  });
});
