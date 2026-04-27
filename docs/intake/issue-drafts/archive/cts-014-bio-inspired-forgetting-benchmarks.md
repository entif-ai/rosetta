# CTS-014: Bio-Inspired Forgetting — Downsampling Fidelity Benchmarks

## Type
`research`

## Labels
`memory-forge`, `forgetting`, `downsampling`, `fidelity`, `benchmarks`

## Depends On
`SemanticCodecForge (CTS-001)`

## Evidence
PRD Section 2.3: "Tier 2: Cool/Long-Term Memory, 7-90 days: Tier 1 images are progressively downsampled (e.g., to 50% resolution). They use even fewer vision tokens to recall and the text may have minor blurring/errors, mimicking natural memory fade."

PRD: "Tier 3: Cold/Archival Memory, 90+ days: Images are further downsampled or converted to text summaries and indexed in the graph. The 'gist' remains, but perfect recall is gone."

## Problem Statement
The forgetting mechanism assumes 50% downsampling for Tier 2 and summary conversion for Tier 3, but provides no empirical basis for these specific thresholds. We need benchmark data to determine what resolution loss is acceptable before the information becomes more harmful than useful.

## Scope

### Must Include
- [ ] Benchmark corpus: representative document set (N documents, varied complexity)
- [ ] Resolution ladder: test at 100%, 75%, 50%, 25%, 10% of original resolution
- [ ] Fidelity metrics: edit distance at each resolution (vs original), readability scores, information retention %
- [ ] Human evaluation: threshold at which Tier 2/Tier 3 becomes unusable for actual tasks
- [ ] Threshold determination: maximum acceptable information loss before degradation > utility
- [ ] Recommendations: optimal resolution for Tier 2, summary quality for Tier 3

### Should Include
- [ ] Document-type variation: text-heavy vs chart-heavy vs mixed
- [ ] Font size sensitivity: small fonts degrade faster
- [ ] Real-world task accuracy: downstream task accuracy at each tier
- [ ] Cost/benefit: computational savings vs accuracy loss at each tier

### Could Include
- [ ] Personalized thresholds by user/role
- [ ] Automatic tier adjustment based on content type
- [ ] Longitudinal study: user perception of memory quality over time

## Acceptance Criteria
- [ ] Benchmark corpus defined and accessible
- [ ] Fidelity data collected at each resolution level for N documents
- [ ] Edit distance curve: showing graceful degradation vs resolution
- [ ] Threshold recommendations: Tier 2 optimal resolution, Tier 3 summary fidelity minimum
- [ ] Decision criteria: when does forgetting become harmful?

## Notes
This is a research issue, not implementation. Results inform CTS-004 implementation. Until benchmarks exist, the 50% and summary thresholds are placeholders.

## Status
`draft`
