import { Activity, User } from "../../generated/schema";
import { BigInt, ethereum, Address } from "@graphprotocol/graph-ts";
import { getOrCreateUser } from './getOrCreateUser';
// import { log } from '@graphprotocol/graph-ts'

// enum ActivityType {
//   Vote
//   Stake
//   Unstake
//   Ratify
//   Reject
//   Create
//   Veto
// }

export function getActivityId(
  activityType: string,
  userAddress: string,
  transactionHash: string,
  logIndex: string
): string {
  return "activity-" + activityType + "-" + userAddress + "-" + transactionHash + "-" + logIndex;
}

export function createActivity(
  event: ethereum.Event,
  activityType: string,
  userAddress: string,
  proposalId: string | null = null,
  votes: BigInt | null = null,
  glowAmount: BigInt | null = null
): void {
  const activityId = getActivityId(
    activityType,
    userAddress,
    event.transaction.hash.toHexString(),
    event.logIndex.toString()
  );

  let activity = new Activity(activityId);

  let user = getOrCreateUser(Address.fromString(userAddress));

  activity.user = user.id;
  activity.activityType = activityType;
  activity.timestamp = event.block.timestamp;
  activity.transactionHash = event.transaction.hash;

  if (proposalId) {
    activity.proposal = proposalId;
  }

  if (votes) {
    activity.votes = votes;
  }

  if (glowAmount) {
    activity.glowAmount = glowAmount;
  }

  activity.save();
}