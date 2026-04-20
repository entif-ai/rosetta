import { describe, expect, it } from 'vitest';

import {
  buildTile,
  createObservation,
  createRun,
  createConcept,
  createConjecture,
  createEpisteme,
  createFormToken,
  createFrame,
  createLatticeEdge,
  createLexeme,
  createMatrix,
  createPolicy,
  createDeltaCapsule,
  verifyTileIntegrity
} from './rosetta-core.js';

describe('rosetta-core', () => {
  it('keeps tile ids stable across payload key order changes', () => {
    const left = buildTile('rosetta.action', { actionId: 'a', intent: 'alpha', extra: { y: 2, x: 1 } });
    const right = buildTile('rosetta.action', { extra: { x: 1, y: 2 }, intent: 'alpha', actionId: 'a' });

    expect(left.cid).toBe(right.cid);
  });

  it('verifies tile integrity', () => {
    const run = createRun('bootstrap');
    expect(verifyTileIntegrity(run).ok).toBe(true);
  });

  it('creates source observations', () => {
    const observation = createObservation('datacite', 'metadata fetched');
    expect(observation.kind).toBe('rosetta.observation');
  });
});

describe('semantic tile constructors', () => {
  describe('createFormToken', () => {
    it('builds a Layer-1 token tile with correct kind and provenance', () => {
      const obs = createObservation('test', 'hello world');
      const token = createFormToken('hello', 0, 5, 'word', obs.cid);

      expect(token.kind).toBe('rosetta.form.token');
      expect(token.payload.surface).toBe('hello');
      expect(token.payload.tokenType).toBe('word');
      expect(token.parents).toContain(obs.cid);
    });

    it('produces stable CID across calls with identical input', () => {
      const obs = createObservation('test', 'hello world');
      const a = createFormToken('hello', 0, 5, 'word', obs.cid);
      const b = createFormToken('hello', 0, 5, 'word', obs.cid);
      expect(a.cid).toBe(b.cid);
    });
  });

  describe('createLexeme', () => {
    it('builds a Layer-2 lexeme tile with senses and form links', () => {
      const obs = createObservation('test', 'bank');
      const token = createFormToken('bank', 0, 4, 'word', obs.cid);
      const lexeme = createLexeme(
        'bank',
        'noun',
        'en',
        [
          { senseId: 'bank-n-1', definition: 'financial institution', weight: 0.7 },
          { senseId: 'bank-n-2', definition: 'side of a river', weight: 0.3 }
        ],
        [token.cid]
      );

      expect(lexeme.kind).toBe('rosetta.lexeme');
      expect(lexeme.payload.senses).toHaveLength(2);
      expect(lexeme.payload.senses[0].weight).toBe(0.7);
    });
  });

  describe('createConcept', () => {
    it('builds a Layer-3 concept tile with optional RID and XID', () => {
      const concept = createConcept('Paris', 'geonames', {
        rid: 'rid:entify:Paris',
        description: 'Capital of France',
        xid: 'Q90',
        xidPack: 'wikidata'
      });

      expect(concept.kind).toBe('rosetta.concept');
      expect(concept.payload.label).toBe('Paris');
      expect(concept.payload.rid).toBe('rid:entify:Paris');
      expect(concept.payload.xid).toBe('Q90');
    });
  });

  describe('createFrame', () => {
    it('builds a frame tile with roles, some filled, some as variables', () => {
      const country = createConcept('France', 'countries');
      const capital = createConcept('Paris', 'cities');
      const frame = createFrame(
        'CapitalRelationFrame',
        [
          { roleName: 'country', required: true, expectedType: 'countries', filledBy: [country.cid] },
          { roleName: 'capital', required: true, expectedType: 'cities', variable: true }
        ],
        [country.cid, capital.cid]
      );

      expect(frame.kind).toBe('rosetta.frame');
      expect(frame.payload.frameType).toBe('CapitalRelationFrame');
      expect(frame.payload.roles[1].variable).toBe(true);
    });
  });

  describe('createLatticeEdge', () => {
    it('creates a typed lattice edge with semantic family', () => {
      const a = createConcept('Mammal', 'biology');
      const b = createConcept('Dog', 'biology');
      const edge = createLatticeEdge(a.cid, b.cid, 'specializes', 'semantic');

      expect(edge.kind).toBe('rosetta.lattice_edge');
      expect(edge.payload.relation).toBe('specializes');
      expect(edge.payload.family).toBe('semantic');
    });
  });

  describe('createConjecture', () => {
    it('captures Layer-2 ambiguity as a weighted distribution', () => {
      const bank = createLexeme(
        'bank', 'noun', 'en',
        [{ senseId: 's1', definition: 'financial', weight: 0.6 }, { senseId: 's2', definition: 'river', weight: 0.4 }],
        []
      );
      const conj = createConjecture(bank.cid, 'L2_lexeme_concept', [
        { targetCid: 'concept.financial', weight: 0.6, evidence: 'context clue: money' },
        { targetCid: 'concept.river', weight: 0.4, evidence: 'river context' }
      ], 'context_vector');

      expect(conj.kind).toBe('rosetta.conjecture');
      expect(conj.payload.layer).toBe('L2_lexeme_concept');
      expect(conj.payload.options).toHaveLength(2);
      expect(conj.payload.options[0].weight).toBe(0.6);
    });
  });

  describe('createEpisteme', () => {
    it('wraps a claim with epistemic mode and evidence', () => {
      const evidenceCid = createObservation('sensor', 'temperature reading 22C').cid;
      const episteme = createEpisteme(
        'The room is warm.',
        'EMPIRICAL',
        [evidenceCid],
        [],
        0.85,
        { contestability: 'low', confidenceBreakdown: { logos: 0.9, ethos: 0.8 } }
      );

      expect(episteme.kind).toBe('rosetta.episteme');
      expect(episteme.payload.mode).toBe('EMPIRICAL');
      expect(episteme.payload.confidence).toBe(0.85);
      expect(episteme.payload.confidenceBreakdown?.logos).toBe(0.9);
    });
  });

  describe('createMatrix', () => {
    it('records ELPQ axis scores for a tile', () => {
      const subject = createObservation('test', 'hello').cid;
      const matrix = createMatrix(subject, {
        ethos: 0.9,
        logos: { value: 0.85, errorBars: [0.8, 0.9] },
        pathos: 0.7,
        quixote: 0.5,
        overall: 0.74
      });

      expect(matrix.kind).toBe('rosetta.matrix');
      expect(matrix.payload.ethos?.value).toBe(0.9);
      expect(matrix.payload.logos?.value).toBe(0.85);
      expect(matrix.payload.logos?.errorBars).toEqual([0.8, 0.9]);
    });
  });

  describe('createPolicy', () => {
    it('creates a governance policy with conditions', () => {
      const policy = createPolicy(
        'no-eval-deny',
        'deny',
        [{ field: 'payload.verdict', operator: 'eq', value: 'deny' }],
        ['rosetta.evaluation']
      );

      expect(policy.kind).toBe('rosetta.policy');
      expect(policy.payload.effect).toBe('deny');
      expect(policy.payload.conditions).toHaveLength(1);
    });

    it('marks deprecated policies with the deprecation kind', () => {
      const oldPolicy = createPolicy(
        'legacy-rule',
        'warn',
        [],
        ['rosetta.evaluation'],
        { deprecation: { deprecatedAt: '2026-06-01T00:00:00Z', supersedes: 'policy.legacy', migrationNote: 'Use no-eval-deny instead' } }
      );

      expect(oldPolicy.kind).toBe('rosetta.policy.deprecation');
      expect(oldPolicy.payload.deprecation?.supersedes).toBe('policy.legacy');
    });
  });

  describe('createDeltaCapsule', () => {
    it('bundles a change set with prerequisites', () => {
      const tile1 = createObservation('test', 'a').cid;
      const delta = createDeltaCapsule(
        'Add concept namespace biology',
        [tile1],
        ['rosetta.core'],
        { prerequisites: ['delta.prior'], supersedes: 'delta.old-bio', migrationSteps: ['Update registry'] }
      );

      expect(delta.kind).toBe('rosetta.delta_capsule');
      expect(delta.payload.prerequisites).toContain('delta.prior');
      expect(delta.payload.supersedes).toBe('delta.old-bio');
    });
  });
});
