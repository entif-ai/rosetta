# CTS-012: ROMA Multi-Pass Financial Document Extraction POC

## Type
`proof-of-concept`

## Labels
`roma`, `multi-pass`, `structured-data`, `chart-detection`, `poc`

## Depends On
`Slice 1 (CTS-001, CTS-002), Slice 2 (CTS-003)`

## Evidence
PRD Section 4.3: "The agent should perform the initial raw text extraction, identify a chart, and then re-invoke the capability with the deep_parse_chart qualifier to get the data as a JSON object."

PRD Section 2.4: "Triage: task = mcpforge.hub.invoke({cap: 'optical_decompress', input: {img, compression: 20x}}). Analyze: The agent (or a specialized Cheap-Judge) scans the returned text for keywords like 'chart,' 'table,' 'figure,' 'formula.' Decompose & Decide: If a chart is detected, DecisionForge calculates the VOI of getting its structured data. If high, ROMA adds a new step to the plan: Deep Parse: structured_data = mcpforge.hub.invoke({cap: 'optical_decompress', input: {img, qualifiers: ['deep_parse_chart']}})"

## Problem Statement
Demonstrate the full ROMA multi-pass workflow on a real financial document: initial triage → chart detection → VOI calculation → structured data extraction via deep_parse_chart qualifier. This is the Slice 3 proof-of-concept.

## Scope

### Must Include
- [ ] Test corpus: 1-3 real financial PDFs (annual reports with charts)
- [ ] Step 1: Triage pass — 20x compression raw dump, extract raw text
- [ ] Step 2: Analyze pass — Cheap-Judge keyword scan for chart/table/formula/figure
- [ ] Step 3: VOI calculation — DecisionForge computes value of structured data
- [ ] Step 4: Deep Parse — if high VOI, invoke deep_parse_chart qualifier → JSON output
- [ ] JSON output validation: extracted chart data matches original chart
- [ ] Receipt chaining: all 4 steps emit linked receipts
- [ ] End-to-end latency measurement

### Should Include
- [ ] Comparison: manual chart extraction vs ROMA extraction accuracy
- [ ] Edge case: no charts detected — verify graceful handling
- [ ] Edge case: low VOI — verify skip behavior

### Could Include
- [ ] Multi-page chart handling
- [ ] Table extraction via deep_parse_table qualifier

## Acceptance Criteria
- [ ] Full 4-step workflow executes on financial PDF
- [ ] Chart detection accuracy: true positive rate > 80% on test corpus
- [ ] Structured data JSON correct (validated against source chart)
- [ ] VOI calculation: high-VOI charts pass to deep parse; low-VOI charts skip
- [ ] All 4 steps emit linked receipts forming complete audit trail

## Notes
Slice 3 POC. Depends on CTS-001 and CTS-002 (at minimum) being complete. This demonstrates the recursive deep parsing capability.

## Status
`draft`
