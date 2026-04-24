/**
 * LexemeLayer — Layer 2 of the Rosetta meaning pipeline.
 * Maps rosetta.form.token tiles to rosetta.lexeme tiles via word-sense lookup.
 *
 * Preserves ambiguity via rosetta.conjecture tiles (emitConjectures=true).
 * Without a live vocabulary backend, this is a STUB that creates minimal lexemes
 * for tokens where the surface form maps to a known sense.
 *
 * TODO (next cycle): wire in WordNet VocabPack or vector-embedding sense scorer.
 */
import { createConjecture, createLexeme, type TileEnvelope } from "../../../rosetta-core/src/index.js";
import type { PipelineContext } from "./pipeline-context.js";
import type { Layer2Lexemes } from "./pipeline-types.js";

// ── Minimal POS guesser (English, rule-based) ─────────────────────────────────
const SUFFIX_POS: Array<[string, "noun" | "verb" | "adj" | "adv"]> = [
  ["ing", "verb"], ["ed", "verb"], ["ly", "adv"],
  ["tion", "noun"], ["ness", "noun"], ["ment", "noun"],
  ["ful", "adj"], ["ous", "adj"], ["able", "adj"], ["ible", "adj"],
  ["er", "noun"], ["est", "adj"],
];

const COMMON_WORDS: Record<string, Array<{ sense: string; def: string; pos: "noun" | "verb" | "adj" | "adv" }>> = {
  "bank": [
    { sense: "financial", def: "institution where money is deposited and lent", pos: "noun" },
    { sense: "river", def: "side of a body of water", pos: "noun" },
  ],
  "light": [
    { sense: "illumination", def: "source of radiance", pos: "noun" },
    { sense: "not heavy", def: "having little weight", pos: "adj" },
  ],
};

function guessPOS(surface: string): "noun" | "verb" | "adj" | "adv" {
  const lower = surface.toLowerCase();
  for (const [suffix, pos] of SUFFIX_POS) {
    if (lower.endsWith(suffix)) return pos;
  }
  return "noun";
}

export function runLexemeLayer(ctx: PipelineContext): Layer2Lexemes {
  const { L1, options } = ctx;
  if (!L1) throw new Error("L1 (forms) not available — run form layer first");

  const lexemes: TileEnvelope<unknown>[] = [];
  const conjectures: TileEnvelope<unknown>[] = [];
  const formCids: string[] = [];

  for (const tile of L1.forms) {
    const pl = tile.payload as { surface?: string; tokenType?: string };
    if (pl.tokenType !== "word") continue;

    const surface = (pl.surface ?? "").toLowerCase();
    if (surface.length < 2) continue;

    formCids.push(tile.cid);

    // Check known word list first
    const knownSenses = COMMON_WORDS[surface];
    if (knownSenses && knownSenses.length > 1) {
      // Multiple senses → emit conjecture, pick top lexeme
      const senseOptions = knownSenses.map((s, i) => ({
        targetCid: `lexeme:${surface}:${i}`,
        weight: 0.5,
        evidence: `common-word:${s.sense}`,
      }));

      if (options.emitConjectures) {
        const conj = createConjecture(
          tile.cid,
          "L1_form_lexeme",
          senseOptions,
          "common_word_lookup",
          false
        );
        conjectures.push(conj);
        ctx.addToTrace(conj);
      }

      // Emit primary lexeme
      const lex = createLexeme(
        surface,
        knownSenses[0].pos,
        options.language,
        knownSenses.map((s, i) => ({
          senseId: `lexeme:${surface}:${i}`,
          definition: s.def,
          weight: i === 0 ? 0.6 : 0.4,
        })),
        [tile.cid]
      );
      lexemes.push(lex);
      ctx.addToTrace(lex);
    } else {
      // Single sense: create lexeme directly
      const pos = guessPOS(surface);
      const lex = createLexeme(
        surface,
        pos,
        options.language,
        [{ senseId: `${surface}-1`, definition: "pending-vocab-pack", weight: 1.0 }],
        [tile.cid]
      );
      lexemes.push(lex);
      ctx.addToTrace(lex);
    }
  }

  const result: Layer2Lexemes = { lexemes, formCids, conjectures };
  ctx.L2 = result;
  return result;
}
