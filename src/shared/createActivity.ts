import { Activity, User } from "../../generated/schema";
import { BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts";

export function getActivityId(
  userAddress: string,
  transactionHash: string,
  logIndex: string
): string {
  return "activity-" + userAddress + "-" + transactionHash + "-" + logIndex;
}

export function createActivity(
  event: ethereum.Event,
  activityType: string,
  userAddress: string,
  proposalId: string | null = null,
  ratificationVoteId: string | null = null,
  rejectionVoteId: string | null = null,
  stakedGlow: BigInt | null = null,
  unstakedGlow: BigInt | null = null
): void {
  const activityId = getActivityId(
    userAddress,
    event.transaction.hash.toHexString(),
    event.logIndex.toString()
  );

  let activity = new Activity(activityId);
  let user = User.load(userAddress);
  if (user == null) {
    user = new User(userAddress);
    user.save();
  }

  activity.user = user.id;
  activity.activityType = activityType;
  activity.timestamp = event.block.timestamp;
  activity.transactionHash = event.transaction.hash;

  if (proposalId) {
    activity.proposal = proposalId;
  }

  if (ratificationVoteId) {
    activity.ratificationVote = ratificationVoteId;
  }

  if (rejectionVoteId) {
    activity.rejectionVote = rejectionVoteId;
  }

  if (stakedGlow) {
    activity.stakedGlow = stakedGlow;
  }

  if (unstakedGlow) {
    activity.unstakedGlow = unstakedGlow;
  }

  activity.save();
}