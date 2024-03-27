import { User } from "../../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
export function getNextAvailableNonce(user: User): BigInt {
  const counter = user.nonceSeperator;
  const ONE = BigInt.fromU32(1);
  const nextNonce = user.nonceSeperator.plus(ONE);
  user.nonceSeperator = nextNonce;
  user.save();
  return counter;
}
