# TXS-006: Telemetry StdPack: OpenTelemetry + CloudEvents Mapping

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `opentelemetry`, `cloudevents`, `telemetry`, `observability`, `stdpacks`
**Depends on:** none

## Problem Statement

ROCK-3003 Standard Packs lists OpenTelemetry (CNCF) and CloudEvents (CNCF) as integration standards for telemetry and event declaration. No tile mappings, no telemetry injection points, and no OTLP export adapter exist. Rosetta's observability story is incomplete without this.

## Specific Findings

- **F-TXS-008** (confidence: high): OpenAPI 3.1, AsyncAPI, and CloudEvents listed as API contract standards
- **F-TXS-009** (confidence: high): OpenTelemetry is the CNCF standard for collecting and exporting traces, metrics, logs
- **F-TXS-011** (confidence: high): ROCK-3003 lists OpenTelemetry and CloudEvents as aligned standards

## Action Required

1. Define Pasigraphy tile types for OpenTelemetry concepts: Span, Tracer, SpanContext, Metric, LogRecord, Resource, Attributes
2. Map CloudEvents envelope (type, source, specversion, data, datacontenttype) to Pasigraphy event tiles
3. Define telemetry injection points: where in the tile lifecycle does telemetry metadata attach (ingress, processing, storage, egress)
4. Specify OTLP export adapter: how Pasigraphy telemetry tiles serialize to OTLP wire format (protobuf/JSON)
5. Write JSON Schema for telemetry tiles
6. Define Rosetta-native telemetry tile types vs. passthrough OTel映射 tiles (distinguish "Rosetta tracks its own operation" from "Rosetta forwards external events")
