import { User } from "../../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
export function getPastNonce(user: User): BigInt {
  const counter = user.nonceSeperator;
  const ONE = BigInt.fromU32(1);
  const previousNonce = user.nonceSeperator.minus(ONE);
  return previousNonce;
}
