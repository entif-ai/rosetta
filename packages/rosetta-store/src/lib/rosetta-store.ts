import type { TileEnvelope } from '@entif-ai/rosetta-core';

export class RightsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RightsError';
  }
}

export interface StoredTile<P = unknown> {
  rights: string[];
  tile: TileEnvelope<P>;
}

export class InMemoryTileStore {
  private readonly items = new Map<string, StoredTile>();

  put<P>(tile: TileEnvelope<P>, rights: string[] = ['public']): void {
    this.items.set(tile.cid, { rights, tile });
  }

  get<P>(cid: string, consumerRights: string[] = ['public']): TileEnvelope<P> {
    const found = this.items.get(cid);
    if (!found) {
      throw new RightsError(`Tile not found: ${cid}`);
    }

    const allowed = found.rights.some((scope) => scope === 'public' || consumerRights.includes(scope));
    if (!allowed) {
      throw new RightsError(`Consumer lacks rights for tile ${cid}`);
    }

    return found.tile as TileEnvelope<P>;
  }

  has(cid: string): boolean {
    return this.items.has(cid);
  }

  resolveMany(cids: string[], consumerRights: string[] = ['public']): TileEnvelope[] {
    return cids.map((cid) => this.get(cid, consumerRights));
  }
}
