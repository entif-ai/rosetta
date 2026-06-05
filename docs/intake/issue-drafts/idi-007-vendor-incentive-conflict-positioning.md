# IDI-007: Vendor Per-Token Incentive Conflict — Competitive Positioning Opportunity

## Metadata

- **Type**: market/positioning
- **Status**: draft
- **Source doc**: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Evidence**: "the LLM platform vendors would really prefer if nobody did, since they get paid by the number of tokens their customers burn through."
- **Confidence**: medium

## Problem

OpenAI, Anthropic, and Google all earn revenue per token processed through their inference APIs. Entif's thesis is to reduce token volume via semantic caching, rights-scoped retrieval, and local resolution. This is a structural conflict of interest.

However, this conflict is not currently named explicitly in Rosetta or Entif positioning materials. Naming it explicitly:
1. Positions Entif as an independent layer (not captured by any vendor)
2. Gives enterprise buyers a rational frame: "your existing vendors profit from your inefficiency"
3. Makes the independence narrative credible and specific

## Required

- Explicit naming of the vendor incentive conflict in Entif's competitive positioning
- Quantified framing: if Entif reduces token volume by 50-90%, what is the vendor's lost revenue per enterprise per year?
- Argument for why vendors cannot or will not solve this themselves (they would cannibalize their own revenue)
- Independent layer framing: Entif sits between the enterprise and vendor inference APIs, with its own loyalty to the enterprise buyer

## Connection to NOT LAME PRD

The threat model section of NOT LAME already frames vendor lock-in as a risk category. This finding provides a concrete instantiation of that risk and a direct counter-positioning argument.

## TODO

- [ ] Add vendor incentive conflict section to Entif competitive positioning
- [ ] Quantify token cost delta (without Entif vs. with Entif) for a model enterprise deployment
- [ ] Draft the "why vendors can't solve this" argument (revenue cannibalization)
- [ ] Align with NOT LAME threat model: vendor-as-adversary when enterprise interests diverge
