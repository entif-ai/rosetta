
/**
 * FormLayer — Layer 1 of the Rosetta meaning pipeline.
 * Transforms a rosetta.observation into rosetta.form.* tiles.
 *
 * Tokenizes text signals into typed tokens (word, punct, number, emoji, datetime).
 * Each Form tile carries provenance back to the source Observation.
 */
import { createFormToken, createFormDatetime } from "../../../rosetta-core/src/index.js";
import type { TileEnvelope } from "../../../rosetta-core/src/index.js";
import type { PipelineContext } from "./pipeline-context.js";
import type { Layer1Forms } from "./pipeline-types.js";

export interface FormLayerOptions {
  language?: string;
}

/**
 * Tokenize the signal in ctx.observation into rosetta.form.token tiles.
 * Detects: words, punctuation, whitespace, symbols, numbers, emojis, datetimes.
 */
export function runFormLayer(ctx: PipelineContext, _opts: FormLayerOptions = {}): Layer1Forms {
  const obs = ctx.observation;
  const payload = obs.payload as { signal?: string; data?: string; [key: string]: unknown };
  const text: string = (payload.signal ?? payload.data ?? "").toString();
  const observationCid = obs.cid;

  const forms: TileEnvelope<unknown>[] = [];

  // ── Simple tokenizer ────────────────────────────────────────────────────────
  // Handles: words, numbers, punctuation, whitespace, symbols, emojis, datetimes.
  const TOKEN_TYPES: Array<[RegExp, "word" | "number" | "punct" | "whitespace" | "symbol"]> = [
    [/^[a-zA-Z]+/, "word"],
    [/^\d+(?:[.:\-/]\d+)*/, "number"],
    [/^[.,!?;:]/, "punct"],
    [/^[\s]+/, "whitespace"],
    [/^[^\w\s]+/, "symbol"],
  ];

  // Emoji regex (extended unicode ranges)
  const EMOJI_RE = /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  // ISO datetime (simplified)
  const DATETIME_RE = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:?\d{2})?)?/;

  let pos = 0;
  while (pos < text.length) {
    let matched = false;

    // Date-time first
    const dtMatch = text.slice(pos).match(DATETIME_RE);
    if (dtMatch) {
      const raw = dtMatch[0];
      const tile = createFormDatetime(raw, raw, "second", observationCid, [observationCid]);
      forms.push(tile);
      ctx.addToTrace(tile);
      pos += raw.length;
      continue;
    }

    // Emoji
    const emojiMatch = text.slice(pos).match(EMOJI_RE);
    if (emojiMatch) {
      const raw = emojiMatch[0];
      const tile = createFormToken(raw, pos, raw.length, "emoji", observationCid, [observationCid]);
      forms.push(tile);
      ctx.addToTrace(tile);
      pos += raw.length;
      continue;
    }

    // Standard token types
    for (const [re, tokenType] of TOKEN_TYPES) {
      const m = text.slice(pos).match(re);
      if (m) {
        const raw = m[0];
        if (tokenType !== "whitespace") {
          const tile = createFormToken(raw, pos, raw.length, tokenType, observationCid, [observationCid]);
          forms.push(tile);
          ctx.addToTrace(tile);
        }
        pos += raw.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      pos += 1;  // skip unknown char
    }
  }

  const result: Layer1Forms = { forms, observationCid };
  ctx.L1 = result;
  return result;
}
