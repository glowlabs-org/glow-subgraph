import { TotalGlowBurnedAggregate, User } from "../generated/schema";
import { Transfer as GlowTransferEvent, Stake as StakeEvent, Unstake as UnstakeEvent} from "../generated/GLOW/GLOW";
import { BigInt } from "@graphprotocol/graph-ts";
import { CarbonCreditAuctionAddress } from "./constants/CarbonCreditAuctionAddress";
import { createActivity } from './shared/createActivity'

// if(event.params.to == CarbonCreditAuctionAddress)

export function handleTransfer(event: GlowTransferEvent): void {
  if (event.params.to.toHexString() == CarbonCreditAuctionAddress) {
    _handleTransferToCarbonCreditAuction(event);
  }
}

function _handleTransferToCarbonCreditAuction(event: GlowTransferEvent): void {
  let totalGlowBurned = TotalGlowBurnedAggregate.load("1");
  if (!totalGlowBurned) {
    totalGlowBurned = new TotalGlowBurnedAggregate("1");
    totalGlowBurned.totalGlowBurned = BigInt.fromU64(0);
  }

  totalGlowBurned.totalGlowBurned = totalGlowBurned.totalGlowBurned.plus(
    event.params.value,
  );
  totalGlowBurned.save();
}

export function handleStake(event: StakeEvent): void {
  
  let userAddress = event.params.user.toHexString();
  let stakeAmount = event.params.amount;

  // TODO: Maybe keep track of the stake amount by user
  // let user = User.load(userAddress);
  // if (!user) {
  //   user = new User(userAddress);
  //   user.totalUSDCEffect = BigInt.fromI32(0);
  //   user.nonceSeperator = BigInt.fromI32(0);
  //   user.totalImpactPoints = BigInt.fromI32(0);
  // }
  // user.stakedGlow = (user.stakedGlow || BigInt.fromI32(0)).plus(stakeAmount);
  // user.save();

  // Create activity for staking

  createActivity(
    event,
    "Stake",
    userAddress,
    null,  // proposalId
    null, // ratificationVoteId
    null, // rejectionVoteId
    stakeAmount, // stakedGlow
    null  // unstakedGlow
  );
}

export function handleUnstake(event: UnstakeEvent): void {
  // let userAddress = event.params.user.toHexString();
  // let unstakeAmount = event.params.amount;

  // // TODO: Update user's staked amount
  // // let user = User.load(userAddress);
  // // if (user) {
  // //   user.stakedGlow = (user.stakedGlow || BigInt.fromI32(0)).minus(unstakeAmount);
  // //   user.save();
  // // }

  // // Create activity for unstaking
  // createActivity(
  //   event,
  //   "Unstake",
  //   userAddress,
  //   unstakedGlow: unstakeAmount
  // );
}