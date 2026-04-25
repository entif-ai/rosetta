# AR-002: Model Block-Size Cost Tradeoff for Tapestry Segmentation

**Type:** research  
**Status:** draft  
**Labels:** tapestry, memory-cost-modeling, block-size  
**Depends on:** —

---

## Context

AttnRes (Kimi Team, arXiv:2603.15031) demonstrates that partitioning a depth dimension into N blocks — where N is small (~8) relative to the total layer count L — recovers most of the gains from full-depth attention while reducing memory complexity from O(Ld) to O(Nd).

Rosetta's tapestry is described as "a bounded compiled package of receipts" with "closure verifiable." The current design implies some form of segmentation (by episode, source, or rights scope), but the block size parameter — how many source episodes or artifacts are grouped into a single tapestry unit — is not explicitly modeled or tuned.

## Claim

Tapestry block size is an architectural parameter with a cost tradeoff analogous to AttnRes's block partition:

- **Larger blocks (more artifacts per tapestry unit):** Lower retrieval overhead (fewer units to query), faster closure verification, but coarser access granularity — relevant receipts may be mixed with noise within a block
- **Smaller blocks (fewer artifacts per tapestry unit):** Finer retrieval granularity, better signal precision, but higher retrieval overhead and more complex closure verification across many small units
- **Optimal N:** AttnRes finds ~8 blocks as a sweet spot; Rosetta's tapestry may have a comparable optimal block size driven by receipt density per episode and retrieval precision requirements

## Research Questions

1. What is the current tapestry segmentation rule? (episode-based? rights-scope-based? time-based?)
2. Is there an explicit block size parameter, or is it emergent from source episode boundaries?
3. What is the cost model: how does retrieval latency scale with number of tapestry units vs. receipts per unit?
4. What is the equivalent of AttnRes's "8 blocks" for Rosetta — is there a natural tranche size based on the domain?
5. Does finer segmentation improve or degrade closure verification? (more units to verify = higher cost, but each unit is simpler)
6. Is there an AttnRes-style memory efficiency gain available if Rosetta explicitly tunes block size? (i.e., could coarser blocks reduce pgvector query cost without meaningful retrieval precision loss?)

## Evidence

- AttnRes Block AttnRes: O(Nd) memory with ~8 blocks; recovers most of full O(Ld) attention gains
- Rosetta tapestry definition: "bounded compiled package of receipts; closure verifiable"
- Rosetta Memory Sovereignty Map: Plane 1 = truth/provenance (artifact layer); Plane 2 = temporal/history; both feed Plane 3 = activation/relevance
- If segmentation happens at the Plane 1 → Plane 2 boundary, block size tuning at that transition is the equivalent decision point

## Risks

- Tapestry block size is likely domain-dependent (text vs. code vs. audio have different natural episode densities); no single optimal N may exist
- Coarser blocks reduce pgvector query count but may increase per-query scan cost if each block is larger
- This is a cost modeling exercise; actual tuning requires empirical data from representative workloads

## Notes

- This is a research issue; no implementation is implied
- Related to AR-001 (depth aggregation for Plane 3) — both address the depth/block dimension of memory architecture
