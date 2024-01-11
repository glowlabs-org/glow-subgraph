import { BigInt } from "@graphprotocol/graph-ts";
import { ProtocolFeeSum } from "../../generated/schema";
export function getProtocolFeeAggregationObject(): ProtocolFeeSum {
  const id = "protocol-fee-aggregation";
  let entity = ProtocolFeeSum.load(id);
  if (!entity) {
    entity = new ProtocolFeeSum(id);
    entity.totalProtocolFeesPaid = BigInt.fromU64(0);
  }
  return entity;
}
