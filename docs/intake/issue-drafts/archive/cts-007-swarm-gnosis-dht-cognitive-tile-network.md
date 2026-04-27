# CTS-007: Swarm Gnosis Network — DHT Peer Discovery + Cognitive Tile Protocol

## Type
`architecture/spec-gap`

## Labels
`swarm-gnosis`, `p2p`, `dht`, `cognitive-tiles`, `bit-torrent`

## Depends On
`SemanticCodecForge core (CTS-001)`

## Evidence
PRD Section (model thoughts, Swarm Gnosis): "Swarm Gnosis architecture. The concept of 'Cognitive Tiles' is crystallizing – these self-contained units with headers and payloads... The 'Gnostic Atlas' is emerging as the complete mosaic, with foundational concepts at the center, branching into domain-specific knowledge."

PRD: "DHT-based peer discovery; content-addressed by hash; caching hierarchy like DNS."

CT-001 from prior extraction: "Network layer for Swarm Gnosis not yet defined; needs DHT/Kademlia or similar"

## Problem Statement
Swarm Gnosis is the decentralized, p2p distribution layer for Cognitive Tiles, inspired by BitTorrent's chunk-splitting architecture. It needs a defined network protocol with DHT-based peer discovery and content-addressed tile storage.

## Scope

### Must Include
- [ ] Cognitive Tile anatomy: header (metadata), payload (Gnostic Field patch), border/connections
- [ ] Tile content-addressing: hash-based addressing (content hash = tile ID)
- [ ] DHT peer discovery: Kademlia-style DHT for peer lookup
- [ ] Network protocol: tile request/response flow
- [ ] Tile propagation: how new tiles spread through network
- [ ] Caching hierarchy: "lightbulb" caching for prevalent tiles (DNS-inspired)
- [ ] Gnostic Atlas: tile mosaic structure with foundational concepts at center
- [ ] Peer信誉/survivorship scoring (from OMOC spec)

### Should Include
- [ ] Tile size limits and chunking strategy
- [ ] Parallel download support (multiple peers for one tile)
- [ ] Incentive mechanism for seeding (if not purely altruistic)
- [ ] Network partition handling

### Could Include
- [ ] Tiered caching (hot/warm/cool/cold tile cache)
- [ ] Cross-seed collaboration with other Entif instances
- [ ] Tor/I2P overlay for privacy

## Acceptance Criteria
- [ ] Network protocol spec complete with message types and flow diagrams
- [ ] DHT implementation functional in test environment
- [ ] Two peers can discover each other and transfer a tile
- [ ] Content-addressing verified: tile hash matches requested content
- [ ] Gnostic Atlas structure demonstrable (small test atlas)

## Notes
CT-001 applies from prior extraction. This is the Swarm Gnosis network layer spec; ZK-proof validation (CT-002) and EGC integration (CT-003) are separate issues.

## Status
`draft`
