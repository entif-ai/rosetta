import { buildTile, type TileEnvelope } from '@entif-ai/rosetta-core';

export interface ReceiptBundleTapestryPayload {
  dynamicTail: string[];
  receiptCid: string;
  requiredScope: string;
  stablePrefix: string[];
  subjectCids: string[];
  tapestries: string[];
  tenant: string;
  totalTokens: number;
}

export function compileReceiptBundleTapestry(
  receiptCid: string,
  subjectCids: string[],
  evidenceCids: string[],
  policyCids: string[],
  requiredScope = 'public'
): TileEnvelope<ReceiptBundleTapestryPayload> {
  return buildTile(
    'rosetta.tapestry',
    {
      dynamicTail: [...evidenceCids, ...policyCids],
      receiptCid,
      requiredScope,
      stablePrefix: [...subjectCids],
      subjectCids,
      tapestries: [receiptCid],
      tenant: 'bootstrap',
      totalTokens: subjectCids.length * 8 + evidenceCids.length * 6 + policyCids.length * 4
    },
    { pack: 'rosetta.tapestry' }
  );
}
