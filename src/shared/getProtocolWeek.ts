import { BigInt } from "@graphprotocol/graph-ts";
import { GENESIS_TIMESTAMP } from "../constants/GenesisTimestamp";

export function getProtocolWeek(timestamp: BigInt): BigInt {
  const genesisBigNumber = BigInt.fromI32(GENESIS_TIMESTAMP);
  const one_week = BigInt.fromI32(604800);
  //week number =
  const weekNumber = timestamp.minus(genesisBigNumber).div(one_week);
  return weekNumber;
}
