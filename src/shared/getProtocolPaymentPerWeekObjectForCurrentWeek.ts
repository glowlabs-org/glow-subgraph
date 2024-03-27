import { BigInt } from "@graphprotocol/graph-ts";
import { ProtocolFeePaymentsPerWeek } from "../../generated/schema";
import { getProtocolWeek } from "./getProtocolWeek";
export function getProtocolPaymentPerWeekObjectForCurrentWeek(
  currentTimestamp: BigInt,
): ProtocolFeePaymentsPerWeek {
  const id = getProtocolWeek(currentTimestamp).toString();
  let entity = ProtocolFeePaymentsPerWeek.load(id);
  if (!entity) {
    entity = new ProtocolFeePaymentsPerWeek(id);
    entity.totalPayments = BigInt.fromU64(0);
  }
  return entity;
}
