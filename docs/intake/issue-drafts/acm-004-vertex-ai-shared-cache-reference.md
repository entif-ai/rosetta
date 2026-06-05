# ACM-004: Vertex AI as Canonical Shared-Cache Reference Architecture

## Issue

The API-driven cache management dialogue identifies that GCP Vertex AI is the only major LLM provider offering a real named cache resource (`CachedContent`) with IAM-controlled access — making it the only provider that natively supports "maintain seat separation, share one context cache" without gateway centralization.

This should be formally adopted as the reference architecture for the shared-cache component of the Entif product, with explicit rationale for why OpenAI and Anthropic require different patterns.

## Why This Matters

If Entif is sold as an "inference firewall + semantic cache router," the cache router must have a canonical reference architecture to avoid vendor-specific lock-in at the architecture level. Vertex AI's named-cache-with-IAM model is the clearest articulation of what Entif's own cache layer should approximate internally.

## Scope

1. Document the Vertex AI shared-cache pattern explicitly in the NOT LAME architecture section:
   - `projects/{project}/locations/{location}/cachedContents/{cache_id}` as a GCP resource
   - IAM-controlled access (service accounts, not user seats)
   - Explicit create/get/list/delete API surface
   - TTL managed by Entif, not by the vendor

2. Contrast with Table: Provider Cache Boundary Comparison:

   | Provider | Cache primitive | Shared cache boundary | Named cache ID? | IAMgoverned? |
   |----------|---------------|----------------------|-----------------|-------------|
   | OpenAI   | Automatic prefix cache | API org (members only) | No | No |
   | Anthropic | `cache_control` breakpoints | Claude workspace (post-Feb 2026) | No | No |
   | Google Gemini (AI Studio) | Implicit: project-level; Explicit: named CachedContent | Project | Yes (explicit only) | No (Gemini developer API) |
   | Google Vertex AI | Named CachedContent | Project | Yes | Yes (IAM) |
   | Entif internal | Content-addressable pack | Rights domain + policy version | Yes (content hash) | Yes (ABAC) |

3. Recommend: for Entif deployments where Google Vertex AI is in the stack, leverage Vertex's native CachedContent as the authoritative cache artifact rather than replicating it in the Entif local cache layer. Entif's ABAC gate still applies on read.

## References

- Source: docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (Vertex AI section)
- Provider docs: Google Cloud Vertex AI context caching; Google AI Developers context caching

## Labels

architecture, google, vertex-ai, cache

## Status

doc-candidate
