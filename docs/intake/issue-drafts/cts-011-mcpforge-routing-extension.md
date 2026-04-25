# CTS-011: MCPForge Routing Table Extension — compression_ratio + required_precision

## Type
`implementation`

## Labels
`mcpforge`, `routing`, `compression-precision`, `structured-data`

## Depends On
`MCPForge core`

## Evidence
PRD Section 2.1: "The mcpforge.hub.invoke will route requests based on a new set of criteria: compression_ratio, required_precision, is_structured_data. For a quick, cheap text dump, it might use a high-compression, low-token model. For a legal document, it would use a high-precision, low-compression route."

## Problem Statement
MCPForge's capability routing needs to support the new optical decompression criteria so that the hub can route to the optimal provider based on the caller's requirements (cheap/fast vs precise/slow).

## Scope

### Must Include
- [ ] New routing criteria: compression_ratio (number), required_precision (number or enum), is_structured_data (boolean)
- [ ] Provider capability metadata: each optical decompress provider declares its compression_ratio range, precision, structured_data support
- [ ] Routing table update: extend existing table schema to include new criteria columns
- [ ] Selection algorithm: given caller's criteria, select best-fit provider
- [ ] CapabilityDescriptor update: add compression_ratio, precision fields
- [ ] Qualifier routing: deep_parse_chart qualifier triggers structured-data-capable provider

### Should Include
- [ ] Provider fallback chain: if best provider fails, try next-best
- [ ] Routing telemetry: log which provider selected and why
- [ ] Dynamic provider registration with new metadata

### Could Include
- [ ] Multi-criteria optimization (Pareto frontier for compression vs precision)
- [ ] A/B routing for provider comparison

## Acceptance Criteria
- [ ] Provider metadata includes compression_ratio and precision fields
- [ ] Hub routes correctly: high-compression request → high-compression provider; high-precision request → high-precision provider
- [ ] is_structured_data routing works: chart detection → provider with deep_parse_chart capability
- [ ] Routing decisions logged with criteria

## Notes
Coordinate with existing MCPForge hub implementation. This extends the existing routing table, not a replacement.

## Status
`draft`
