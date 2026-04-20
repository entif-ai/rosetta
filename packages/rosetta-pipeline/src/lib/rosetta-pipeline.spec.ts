import { describe, expect, it } from "vitest";

import { createObservation } from "../../../rosetta-core/src/index.js";
import { entiSkillFromFrame, observationFromToolResult } from "./enti-skill.js";
import { runPipeline } from "./pipeline-runner.js";

describe("rosetta-pipeline", () => {
  it("resolves a capital question into a capital relation frame", () => {
    const observation = createObservation("user", "What is the capital of France?");
    const result = runPipeline(observation);
    const frames = result.layers.L3?.frames ?? [];
    const capitalFrame = frames.find((frame) => frame.kind === "rosetta.frame" && frame.payload.frameType === "CapitalRelationFrame");

    expect(capitalFrame).toBeDefined();
    expect(result.errors).toHaveLength(0);

    const roles = capitalFrame?.payload.roles ?? [];
    const countryRole = roles.find((role) => role.roleName === "country");
    const capitalRole = roles.find((role) => role.roleName === "capital");

    expect(countryRole?.filledBy?.length).toBe(1);
    expect(capitalRole?.variable).toBe(true);

    const plan = capitalFrame ? entiSkillFromFrame(capitalFrame) : null;
    expect(plan?.skillName).toBe("knowledge.capital_lookup");
    expect(plan?.input.answerRole).toBe("capital");
  });

  it("turns tool output into a Rosetta observation", () => {
    const observation = observationFromToolResult("knowledge.graph.lookup", {
      capital: "Paris",
      country: "France",
    });

    expect(observation.kind).toBe("rosetta.observation");
    expect(observation.payload.source).toBe("knowledge.graph.lookup");
    expect(observation.payload.signal).toContain("France");
  });
});
