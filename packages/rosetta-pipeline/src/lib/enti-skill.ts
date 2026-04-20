/**
 * enti-skill — bridge between Rosetta semantic frames and actionable skills.
 */
import { createObservation, type FramePayload, type JsonValue, type TileEnvelope } from "../../../rosetta-core/src/index.js";

export interface SkillInvocation {
  confidence: number;
  frameCid: string;
  input: Record<string, JsonValue>;
  intent: string;
  requiredTools: string[];
  skillName: string;
}

export function entiSkillFromFrame(frame: TileEnvelope<unknown>): SkillInvocation | null {
  if (frame.kind !== "rosetta.frame") {
    return null;
  }

  const payload = frame.payload as FramePayload;
  const roles = Object.fromEntries(
    payload.roles.map((role) => [
      role.roleName,
      {
        expectedType: role.expectedType ?? null,
        filledBy: role.filledBy ?? [],
        required: role.required,
        variable: role.variable ?? false,
      },
    ])
  );
  const variableRoles = payload.roles.filter((role) => role.variable).map((role) => role.roleName);

  switch (payload.frameType) {
    case "CapitalRelationFrame":
      return {
        confidence: 0.96,
        frameCid: frame.cid,
        input: {
          answerRole: "capital",
          conceptCids: payload.conceptCids,
          countryCid: payload.roles.find((role) => role.roleName === "country")?.filledBy?.[0] ?? null,
          frameType: payload.frameType,
          roles,
          variableRoles,
        },
        intent: "Resolve the capital city associated with the requested country.",
        requiredTools: ["knowledge.graph.lookup", "entity.resolve"],
        skillName: "knowledge.capital_lookup",
      };
    case "EntityLookupFrame":
      return {
        confidence: 0.84,
        frameCid: frame.cid,
        input: {
          conceptCids: payload.conceptCids,
          frameType: payload.frameType,
          roles,
          variableRoles,
        },
        intent: "Look up the missing attribute for the focused entity.",
        requiredTools: ["knowledge.graph.lookup"],
        skillName: "knowledge.entity_lookup",
      };
    case "GreetingFrame":
      return {
        confidence: 0.98,
        frameCid: frame.cid,
        input: {
          conceptCids: payload.conceptCids,
          frameType: payload.frameType,
          roles,
          variableRoles,
        },
        intent: "Generate a socially appropriate greeting response.",
        requiredTools: [],
        skillName: "conversation.greeting",
      };
    case "QuestionFrame":
      return {
        confidence: 0.7,
        frameCid: frame.cid,
        input: {
          conceptCids: payload.conceptCids,
          frameType: payload.frameType,
          roles,
          variableRoles,
        },
        intent: "Answer a general semantic question using the available context.",
        requiredTools: ["semantic.search"],
        skillName: "reasoning.answer_question",
      };
    default:
      return null;
  }
}

export function observationFromToolResult(toolName: string, result: unknown): TileEnvelope<unknown> {
  const signal = truncate(`${toolName}: ${toolResultSummary(result)}`, 1200);
  return createObservation(toolName, signal);
}

function toolResultSummary(result: unknown): string {
  if (typeof result === "string") {
    return result;
  }

  if (typeof result === "number" || typeof result === "boolean" || result === null) {
    return String(result);
  }

  if (Array.isArray(result)) {
    return stableJson(result);
  }

  if (typeof result === "object") {
    const record = result as Record<string, unknown>;
    for (const key of ["signal", "summary", "message", "result"]) {
      const value = record[key];
      if (typeof value === "string" && value.trim().length > 0) {
        return value;
      }
    }
    return stableJson(record);
  }

  return String(result);
}

function stableJson(value: unknown): string {
  return JSON.stringify(sortJson(value));
}

function sortJson(value: unknown): JsonValue {
  if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => sortJson(entry));
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).sort(([left], [right]) => left.localeCompare(right));
    return Object.fromEntries(entries.map(([key, entry]) => [key, sortJson(entry)])) as Record<string, JsonValue>;
  }

  return String(value);
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1)}…`;
}
