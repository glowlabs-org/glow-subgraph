import {
  Donation,
  EarlyLiquidityOrDonationTransactionHashNonceManager,
  EarlyLiquidityPurchase,
} from "../generated/schema";
import { AmountDonatedToBucket as AmountDonatedToBucketEvent } from "../generated/MinerPoolAndGCA/MinerPoolAndGCA";
import { User } from "../generated/schema";
import { getNextAvailableNonce } from "./shared/getNextAvailableNonce";
import { getOrCreateUser } from "./shared/getOrCreateUser";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ProtocolFeeSum } from "../generated/schema";
import { getProtocolFeeAggregationObject } from "./shared/getProtocolFeeAggregationObject";
export function handleAmountDonated(event: AmountDonatedToBucketEvent): void {
  const msg_sender = event.transaction.from;
  const msg_sender_hex = msg_sender.toHexString();
  let from = getOrCreateUser(msg_sender);

  let entity = new Donation(
    getDonationId(msg_sender, getNextAvailableNonce(from)),
  );
  entity.user = from.id;
  entity.amount = event.params.totalAmountDonated;
  entity.bucketId = event.params.bucketId;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.isDonation = true;
  entity.save();

  const protocolFeeSum = getProtocolFeeAggregationObject();
  protocolFeeSum.totalProtocolFeesPaid =
    protocolFeeSum.totalProtocolFeesPaid.plus(event.params.totalAmountDonated);
  protocolFeeSum.save();
}

export function getDonationId(from: Address, nonce: BigInt): string {
  const msg_sender_hex = from.toHexString();
  return `donation-${msg_sender_hex}-${nonce}`;
}
