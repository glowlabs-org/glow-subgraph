import { GCCRetired as GCCRetiredEvent } from "../generated/GCC/GCC";
import { GCCRetired } from "../generated/schema";
import { USDCRetired as USDCRetiredEvent } from "../generated/GCC/GCC";
import { User } from "../generated/schema";
import { getOrCreateUser } from "./shared/getOrCreateUser";
export function handleGCCRetired(event: GCCRetiredEvent): void {
  let entity = new GCCRetired(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  let from = getOrCreateUser(event.params.account);
  let rewardAddress = User.load(event.params.rewardAddress.toHexString());
  if (!rewardAddress) {
    rewardAddress = new User(event.params.rewardAddress.toHexString());
    rewardAddress.save();
  }

  entity.account = from.id;
  entity.rewardAddress = rewardAddress.id;
  entity.amountGCCRetired = event.params.gccAmount;
  entity.usdcEffect = event.params.usdcEffect;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  rewardAddress.totalUSDCEffect = event.params.usdcEffect.plus(
    rewardAddress.totalUSDCEffect,
  );
  entity.save();
}

export function handleUSDCRetired(event: USDCRetiredEvent): void {
  let entity = new GCCRetired(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  let from =  getOrCreateUser(event.params.account);
  let rewardAddress = User.load(event.params.rewardAddress.toHexString());
  if (!rewardAddress) {
    rewardAddress = new User(event.params.rewardAddress.toHexString());
    rewardAddress.save();
  }

  entity.account = from.id;
  entity.rewardAddress = rewardAddress.id;
  entity.usdcEffect = event.params.amount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  rewardAddress.totalUSDCEffect = event.params.amount.plus(
    rewardAddress.totalUSDCEffect,
  );
  entity.save();
}
