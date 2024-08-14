import { TotalGlowBurnedAggregate, User } from "../generated/schema";
import { Transfer as GlowTransferEvent, Stake as StakeEvent, Unstake as UnstakeEvent} from "../generated/GLOW/GLOW";
import { BigInt } from "@graphprotocol/graph-ts";
import { CarbonCreditAuctionAddress } from "./constants/CarbonCreditAuctionAddress";
import { createActivity } from './shared/createActivity';
import { getOrCreateUser } from './shared/getOrCreateUser';

export function handleTransfer(event: GlowTransferEvent): void {
  if (event.params.to.toHexString() == CarbonCreditAuctionAddress) {
    _handleTransferToCarbonCreditAuction(event);
  }
}

function _handleTransferToCarbonCreditAuction(event: GlowTransferEvent): void {
  let totalGlowBurned = TotalGlowBurnedAggregate.load("1");
  if (!totalGlowBurned) {
    totalGlowBurned = new TotalGlowBurnedAggregate("1");
    totalGlowBurned.totalGlowBurned = BigInt.fromI32(0);
  }

  totalGlowBurned.totalGlowBurned = totalGlowBurned.totalGlowBurned.plus(event.params.value);
  totalGlowBurned.save();
}

export function handleStake(event: StakeEvent): void {
  let amount = event.params.amount;

  if (!amount) {
    return;
  }
  
  let user = getOrCreateUser(event.params.user);
  user.totalStakedGlow = user.totalStakedGlow.plus(amount);
  user.save();

  createActivity(
    event,
    "Stake",
    user.id,
    null,
    null,
    amount
  );
}

export function handleUnstake(event: UnstakeEvent): void {
  let amount = event.params.amount;
 
  if (!amount) {
    return;
  }

  let user = getOrCreateUser(event.params.user);
  user.totalStakedGlow = user.totalStakedGlow.minus(event.params.amount);
  user.save();

  createActivity(
    event,
    "Unstake",
    user.id,
    null,
    null,
    event.params.amount
  );
}