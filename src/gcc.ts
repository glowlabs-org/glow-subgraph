import { GCCCommitted as GCCRetiredEvent } from "../generated/GCC/GCC";
import { GCCRetired } from "../generated/schema";
import { USDCCommitted as USDCRetiredEvent } from "../generated/GCC/GCC";
import { User } from "../generated/schema";
import { USDCRetired } from "../generated/schema";
import { getOrCreateUser } from "./shared/getOrCreateUser";
import { getNextAvailableNonce } from "./shared/getNextAvailableNonce";
import { incrementTotalImpactPointsGenerated } from "./shared/incrementTotalImpactPointsGenerated";
import { BigInt } from "@graphprotocol/graph-ts";
export function handleGCCRetired(event: GCCRetiredEvent): void {
  let from = getOrCreateUser(event.params.account);
  const nonce = getNextAvailableNonce(from);
  const bytesId = event.transaction.hash.concatI32(
    event.logIndex.toI32() + nonce.toI32(),
  );
  let entity = new GCCRetired(bytesId);

  let rewardAddress = getOrCreateUser(event.params.rewardAddress);
  rewardAddress.totalImpactPoints = event.params.impactPower.plus(
    rewardAddress.totalImpactPoints,
  );
  rewardAddress.save();

  incrementTotalImpactPointsGenerated(
    event.params.impactPower,
    BigInt.fromI32(0),
    event.params.gccAmount,
    event.params.usdcEffect,
  );

  entity.account = from.id;
  entity.rewardAddress = rewardAddress.id;
  entity.amountGCCRetired = event.params.gccAmount;
  entity.usdcEffect = event.params.usdcEffect;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.impactPower = event.params.impactPower;
  rewardAddress.totalUSDCEffect = event.params.usdcEffect.plus(
    rewardAddress.totalUSDCEffect,
  );

  entity.save();
}

export function handleUSDCRetired(event: USDCRetiredEvent): void {
  let from = getOrCreateUser(event.params.account);
  const nonce = getNextAvailableNonce(from);
  const bytesId = event.transaction.hash.concatI32(
    event.logIndex.toI32() + nonce.toI32(),
  );

  let entity = new USDCRetired(bytesId);
  let rewardAddress = getOrCreateUser(event.params.rewardAddress);
  rewardAddress.totalImpactPoints = event.params.impactPower.plus(
    rewardAddress.totalImpactPoints,
  );
  rewardAddress.save();

  incrementTotalImpactPointsGenerated(
    event.params.impactPower,
    event.params.amount,
    BigInt.fromI32(0),
    event.params.amount,
  );

  entity.account = from.id;
  entity.rewardAddress = rewardAddress.id;
  entity.usdcEffect = event.params.amount;
  entity.impactPower = event.params.impactPower;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  rewardAddress.totalUSDCEffect = event.params.amount.plus(
    rewardAddress.totalUSDCEffect,
  );
  entity.save();
}
