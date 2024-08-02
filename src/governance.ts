import {
  RFCProposalCreation,
  VetoCouncilElectionOrSlash as VetoCouncilElectionOrSlashEvent,
} from "../generated/Governance/Governance";
import {
  MostPopularProposalVoteBreakdown,
  NominationSpend,
  NominationsUsed,
  RatificationVote,
  RatificationVoteBreakdown,
  RejectionVote,
  RejectionVoteBreakdown,
  VetoCouncilElectionOrSlashProposal,
} from "../generated/schema";

import { GCACouncilElectionOrSlashCreation as GCACouncilElectionOrSlashCreationEvent } from "../generated/Governance/Governance";
import { GCAElectionOrSlashProposal } from "../generated/schema";
import { RFCProposalCreation as RFProposalCreationEvent } from "../generated/Governance/Governance";
import { RFCProposal } from "../generated/schema";
import { User } from "../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { GrantsProposalCreation as GrantsProposalCreationEvent } from "../generated/Governance/Governance";
import { GrantsProposal } from "../generated/schema";

import { ChangeGCARequirementsProposalCreation as ChangeGCARequirementsProposalCreationEvent } from "../generated/Governance/Governance";
import { ChangeGCARequirementsHashProposal } from "../generated/schema";
import { NominationsUsedOnProposal as NominationsUsedOnProposalEvent } from "../generated/Governance/Governance";
import { getOrCreateUser } from "./shared/getOrCreateUser";
import { getNextAvailableNonce } from "./shared/getNextAvailableNonce";
import { RatifyCast as RatifyCastEvent } from "../generated/Governance/Governance";
import { RejectCast as RejectCastEvent } from "../generated/Governance/Governance";
import { MostPopularProposal } from "../generated/schema";
import { MostPopularProposalSet as MostPopularProposalSetEvent } from "../generated/Governance/Governance";
import { ProposalVetoed as ProposalVetoedEvent } from "../generated/Governance/Governance";
import { createActivity } from './shared/createActivity'

export function vetoCouncilElectionOrSlashHandler(
  event: VetoCouncilElectionOrSlashEvent,
): void {
  // let from =  getOrCreateUser(event.params.proposer);

  let entity = new VetoCouncilElectionOrSlashProposal(
    event.params.proposalId.toString(),
  );

  let proposer = getOrCreateUser(event.params.proposer);
  let newAgent = getOrCreateUser(event.params.newAgent);
  let oldAgent = getOrCreateUser(event.params.oldAgent);

  entity.proposer = event.params.proposer.toHexString();
  entity.oldAgent = event.params.oldAgent.toHexString();
  entity.newAgent = event.params.newAgent.toHexString();

  entity.slashOldAgent = event.params.slashOldAgent;
  // entity.nominationsUsed = event.params.nominationsUsed;
  let nominationsUsed = new NominationsUsed(event.params.proposalId.toString());
  nominationsUsed.proposal = event.params.proposalId.toString();

  nominationsUsed.nominationsUsed = event.params.nominationsUsed;
  //
  nominationsUsed.proposal = event.params.proposalId.toString();
  nominationsUsed.save();

  let nominationSpend = createNominationSpend(
    event.params.proposalId.toString(),
    event.params.nominationsUsed,
    event.params.proposer.toHexString(),
    proposer,
    event.transaction.hash.toHexString(),
    event.transaction.hash,
  );

  entity.nominationsUsed = nominationsUsed.id;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.proposalType = "VetoCouncilElectionOrSlash";
  entity.save();

  createActivity(
    event,
    "Veto",
    event.params.proposer.toHexString(),
    event.params.proposalId.toString(),  // proposalId
    null, // ratificationVoteId
    null, // rejectionVoteId
    null, // stakedGlow
    null  // unstakedGlow
  );
}

export function gcaCouncilElectionOrSlashCreationHandler(
  event: GCACouncilElectionOrSlashCreationEvent,
): void {
  let proposer = getOrCreateUser(event.params.proposer);
  let newGCAs = event.params.newGCAs;
  let agentsToSlash = event.params.agentsToSlash;
  let newGCAIds: string[] = [];
  let agentsToSlashIds: string[] = [];
  for (let i = 0; i < newGCAs.length; i++) {
    let newGCA = getOrCreateUser(newGCAs[i]);
    newGCAIds.push(newGCA.id);
  }
  for (let i = 0; i < agentsToSlash.length; i++) {
    let agentToSlash = getOrCreateUser(agentsToSlash[i]);
    agentsToSlashIds.push(agentToSlash.id);
  }

  let entity = new GCAElectionOrSlashProposal(
    event.params.proposalId.toString(),
  );

  // entity.nominationsUsed = event.params.nominationsUsed;
  let nominationsUsed = new NominationsUsed(event.params.proposalId.toString());
  nominationsUsed.proposal = event.params.proposalId.toString();

  let nominationSpend = createNominationSpend(
    event.params.proposalId.toString(),
    event.params.nominationsUsed,
    event.params.proposer.toHexString(),
    proposer,
    event.transaction.hash.toHexString(),
    event.transaction.hash,
  );

  nominationsUsed.nominationsUsed = event.params.nominationsUsed;

  entity.newGCAs = newGCAIds;
  entity.agentsToSlash = agentsToSlashIds;
  entity.proposer = event.params.proposer.toHexString();
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.nominationsUsed = nominationsUsed.id;
  entity.proposalType = "GCAElectionOrSlash";
  nominationsUsed.save();
  entity.save();

  createActivity(
    event,
    "Create",
    event.params.proposer.toHexString(),
    event.params.proposalId.toString(),  // proposalId
    null, // ratificationVoteId
    null, // rejectionVoteId
    null, // stakedGlow
    null  // unstakedGlow
  );
}

export function rfcProposalCreationHandler(
  event: RFProposalCreationEvent,
): void {
  let proposer = getOrCreateUser(event.params.proposer);
  let entity = new RFCProposal(event.params.proposalId.toString());
  entity.proposer = event.params.proposer.toHexString();
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.proposalType = "RequestForComment";
  entity.hash = event.params.requirementsHash;

  // entity.nominationsUsed = event.params.nominationsUsed;
  let nominationsUsed = new NominationsUsed(event.params.proposalId.toString());
  nominationsUsed.proposal = event.params.proposalId.toString();
  let nominationSpend = createNominationSpend(
    event.params.proposalId.toString(),
    event.params.nominationsUsed,
    event.params.proposer.toHexString(),
    proposer,
    event.transaction.hash.toHexString(),
    event.transaction.hash,
  );
  nominationsUsed.nominationsUsed = event.params.nominationsUsed;
  entity.nominationsUsed = nominationsUsed.id;

  nominationsUsed.save();
  entity.save();

  createActivity(
    event,
    "Create",
    event.params.proposer.toHexString(),
    event.params.proposalId.toString(),  // proposalId
    null, // ratificationVoteId
    null, // rejectionVoteId
    null, // stakedGlow
    null  // unstakedGlow
  );
}

export function grantsProposalCreationHandler(
  event: GrantsProposalCreationEvent,
): void {
  let proposer = getOrCreateUser(event.params.proposer);

  let recipient = getOrCreateUser(event.params.recipient);
  let entity = new GrantsProposal(event.params.proposalId.toString());

  // entity.nominationsUsed = event.params.nominationsUsed;
  let nominationsUsed = new NominationsUsed(event.params.proposalId.toString());
  nominationsUsed.proposal = event.params.proposalId.toString();
  let nominationSpend = createNominationSpend(
    event.params.proposalId.toString(),
    event.params.nominationsUsed,
    event.params.proposer.toHexString(),
    proposer,
    event.transaction.hash.toHexString(),
    event.transaction.hash,
  );
  nominationsUsed.nominationsUsed = event.params.nominationsUsed;
  entity.nominationsUsed = nominationsUsed.id;

  nominationsUsed.save();
  entity.proposer = event.params.proposer.toHexString();
  entity.recipient = event.params.recipient.toHexString();
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.hash = event.params.hash;
  entity.amount = event.params.amount;
  entity.proposalType = "Grants";
  entity.save();

  createActivity(
    event,
    "Create",
    event.params.proposer.toHexString(),
    event.params.proposalId.toString(),  // proposalId
    null, // ratificationVoteId
    null, // rejectionVoteId
    null, // stakedGlow
    null  // unstakedGlow
  );
}

export function changeGCARequirementsProposalCreationHandler(
  event: ChangeGCARequirementsProposalCreationEvent,
): void {
  let proposer = getOrCreateUser(event.params.proposer);

  let entity = new ChangeGCARequirementsHashProposal(
    event.params.proposalId.toString(),
  );
  entity.proposer = event.params.proposer.toHexString();
  entity.hash = event.params.requirementsHash;
  // entity.nominationsUsed = event.params.nominationsUsed;
  let nominationsUsed = new NominationsUsed(event.params.proposalId.toString());
  nominationsUsed.proposal = event.params.proposalId.toString();

  nominationsUsed.nominationsUsed = event.params.nominationsUsed;
  let nominationSpend = createNominationSpend(
    event.params.proposalId.toString(),
    event.params.nominationsUsed,
    event.params.proposer.toHexString(),
    proposer,
    event.transaction.hash.toHexString(),
    event.transaction.hash,
  );
  entity.nominationsUsed = nominationsUsed.id;

  nominationsUsed.save();
  entity.nominationsUsed = nominationsUsed.id;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.proposalType = "ChangeGCARequirements";
  entity.save();

  createActivity(
    event,
    "Create",
    event.params.proposer.toHexString(),
    event.params.proposalId.toString(),  // proposalId
    null, // ratificationVoteId
    null, // rejectionVoteId
    null, // stakedGlow
    null  // unstakedGlow
  );
}

export function nominationsUsedOnProposalHandler(
  event: NominationsUsedOnProposalEvent,
): void {
  let spender = getOrCreateUser(event.params.spender);
  let proposalId = event.params.proposalId.toString();

  let nominationsUsed = NominationsUsed.load(proposalId);

  if (!nominationsUsed) {
    return;
  }
  let nominationSpend = createNominationSpend(
    proposalId,
    event.params.amount,
    event.params.spender.toHexString(),
    spender,
    event.transaction.hash.toHexString(),
    event.transaction.hash,
  );

  nominationsUsed.nominationsUsed = nominationsUsed.nominationsUsed.plus(
    event.params.amount,
  );

  nominationsUsed.save();

  // Save the proposal back to the store
  // proposal.save()

  // Is this an activity?
}

export function mostPopularProposalSetHandler(
  event: MostPopularProposalSetEvent,
): void {
  //Find the id of the proposal ("should just be the weekId")
  let id = getMostPopularProposalId(event.params.weekId);
  //Load in the proposal in case it already exists
  let entity = MostPopularProposal.load(id);
  //If it doesn't exist, create it
  if (!entity) {
    entity = new MostPopularProposal(id);
  }

  //Get the vote breakdown id
  const voteBreakdownId = getMostPopularProposalVoteBreakdownId(
    event.params.proposalId,
    event.params.weekId,
  );
  //Load the vote breakdown in case it already exists
  let voteBreakdown = MostPopularProposalVoteBreakdown.load(voteBreakdownId);
  //If it doesn't exist, create it
  if (!voteBreakdown) {
    voteBreakdown = new MostPopularProposalVoteBreakdown(voteBreakdownId);
  }
  //Set the vote breakdown's proposal to the proposal id
  voteBreakdown.mostPopularProposal = id;

  //Save the proposal in the entity
  entity.proposal = event.params.proposalId.toString();

  //Save the vote breakdown in the entity
  entity.isVetoed = false;
  let ratificationBreakdownId = getRatificationBreakdownId(
    event.params.proposalId,
  );

  let ratificationBreakdown = RatificationVoteBreakdown.load(
    ratificationBreakdownId,
  );
  if (!ratificationBreakdown) {
    ratificationBreakdown = new RatificationVoteBreakdown(
      ratificationBreakdownId,
    );
  }
  ratificationBreakdown.mostPopularProposalVoteBreakdown = voteBreakdownId;
  //We can store is as zero, because if it's getting set
  //it means that the period hasn't finalizd yet
  //and so there are no votes
  ratificationBreakdown.totalRatificationVotes = BigInt.fromI32(0);
  ratificationBreakdown.save();

  let rejectionBreakdownId = getRejectionBreakdownId(event.params.proposalId);
  let rejectionBreakdown = RejectionVoteBreakdown.load(rejectionBreakdownId);
  if (!rejectionBreakdown) {
    rejectionBreakdown = new RejectionVoteBreakdown(rejectionBreakdownId);
  }
  rejectionBreakdown.mostPopularProposalVoteBreakdown = voteBreakdownId;
  //We can store is as zero, because if it's getting set
  //it means that the period hasn't finalizd yet
  //and so there are no votes
  rejectionBreakdown.totalRejectionVotes = BigInt.fromI32(0);

  rejectionBreakdown.save();

  voteBreakdown.ratificationVoteBreakdown = ratificationBreakdown.id;
  voteBreakdown.rejectionVoteBreakdown = rejectionBreakdown.id;
  //Save the vote breakdown
  voteBreakdown.save();

  //Let's check if the current
  entity.voteBreakdown = voteBreakdown.id;

  entity.save();
}
//-----------------RatifyCast-----------------
export function ratifyCastHandler(event: RatifyCastEvent): void {
  let from = getOrCreateUser(event.params.voter);
  let nextNonce = getNextAvailableNonce(from);
  //A ratification vote breakdown is tied directly to the proposalId, so we can just use that
  let ratifyBreakdownId = getRatificationBreakdownId(event.params.proposalId);
  let ratificationVoteBreakdown =
    RatificationVoteBreakdown.load(ratifyBreakdownId);
  if (!ratificationVoteBreakdown) {
    return;
  } else {
    ratificationVoteBreakdown.totalRatificationVotes =
      ratificationVoteBreakdown.totalRatificationVotes.plus(
        event.params.numVotes,
      );
    ratificationVoteBreakdown.save();
  }
  let ratificationVoteId = getRatificationVoteId(
    event.params.proposalId.toString(),
    event.params.voter.toHexString(),
    nextNonce.toString(),
  );
  let ratificationVote = new RatificationVote(ratificationVoteId);
  ratificationVote.user = event.params.voter.toHexString();
  ratificationVote.numberOfVotes = event.params.numVotes;
  ratificationVote.transactionHash = event.transaction.hash;
  ratificationVote.blockTimestamp = event.block.timestamp;
  ratificationVote.ratificationVoteBreakdown = ratificationVoteBreakdown.id;
  ratificationVote.save();

  // Should include how many ratify votes were used

  createActivity(
    event,
    "Ratify",
    event.params.voter.toHexString(),
    event.params.proposalId.toString(),  // proposalId
    ratificationVoteId, // ratificationVoteId
    null, // rejectionVoteId
    null, // stakedGlow
    null  // unstakedGlow
  );
  
}
//-----------------Reject Cast-----------------
export function rejectCastHandler(event: RejectCastEvent): void {
  let from = getOrCreateUser(event.params.voter);
  let nextNonce = getNextAvailableNonce(from);
  let rejectionBreakdownId = getRejectionBreakdownId(event.params.proposalId);
  let rejectionVoteBreakdown =
    RejectionVoteBreakdown.load(rejectionBreakdownId);
  if (!rejectionVoteBreakdown) {
    //This should never happen
    return;
  } else {
    rejectionVoteBreakdown.totalRejectionVotes =
      rejectionVoteBreakdown.totalRejectionVotes.plus(event.params.numVotes);
    rejectionVoteBreakdown.save();
  }
  let rejectionVoteId = getRejectionVoteId(
    event.params.proposalId.toString(),
    event.params.voter.toHexString(),
    nextNonce.toString(),
  );
  let rejectionVote = new RejectionVote(rejectionVoteId);
  rejectionVote.user = event.params.voter.toHexString();
  rejectionVote.numberOfVotes = event.params.numVotes;
  rejectionVote.transactionHash = event.transaction.hash;
  rejectionVote.blockTimestamp = event.block.timestamp;
  rejectionVote.rejectionVoteBreakdown = rejectionVoteBreakdown.id;
  rejectionVote.save();

  createActivity(
    event,
    "Reject",
    event.params.voter.toHexString(),
    event.params.proposalId.toString(),  // proposalId
    null, // ratificationVoteId
    rejectionVoteId, // rejectionVoteId
    null, // stakedGlow
    null  // unstakedGlow
  );
}

export function proposalVetoedHandler(event: ProposalVetoedEvent): void {
  let from = getOrCreateUser(event.params.vetoer);
  let mostPopularProposal = MostPopularProposal.load(
    getMostPopularProposalId(event.params.weekId),
  );
  if (!mostPopularProposal) {
    return;
  }
  mostPopularProposal.vetoer = event.params.vetoer.toHexString();
  mostPopularProposal.isVetoed = true;
  mostPopularProposal.save();

  createActivity(
    event,
    "Veto",
    event.params.vetoer.toHexString(),
    event.params.proposalId.toString(),  // proposalId
    null, // ratificationVoteId
    null, // rejectionVoteId
    null, // stakedGlow
    null  // unstakedGlow
  );
}

//==================================================//
//-----------------Helper Functions-----------------//
//==================================================//

export function getMostPopularProposalId(weekId: BigInt): string {
  return weekId.toString();
}

// export function getActivityId(
//   ownerlId: string,
//   transactionHash: string,
//   logIndex: string,
// ): string {
//   return (
//     "activity-" + ownerlId + "-" + transactionHash + "-" + logIndex
//   );
// }

// function createActivity(
//   event: any, // TODO: Replace 'any' with a more specific type
//   activityType: string,
//   userAddress: string,
//   proposalId: string | undefined = undefined,
//   voteBreakdown: MostPopularProposalVoteBreakdown | undefined = undefined
// ): void {
//   let activityId = getActivityId(
//     userAddress,
//     event.transaction.hash.toHexString(),
//     event.logIndex.toString()
//   );
//   let activity = new Activity(activityId);
//   activity.user = userAddress;
//   activity.activityType = activityType;
//   activity.timestamp = event.block.timestamp;
//   activity.transactionHash = event.transaction.hash;
//   if (proposalId) activity.proposal = proposalId;
//   if (voteBreakdown) activity.voteBreakdown = voteBreakdown.id; 
//   activity.save();
// }

export function getMostPopularProposalVoteBreakdownId(
  proposalId: BigInt,
  weekId: BigInt,
): string {
  return (
    "mpp-vote-breakdown-" + proposalId.toString() + "-" + weekId.toString()
  );
}
export function getNominationSpendId(
  proposalId: string,
  nominationsUsed: BigInt,
  proposer: string,
  nonce: string,
): string {
  let num = nonce;
  let id =
    proposalId + "-" + nominationsUsed.toString() + "-" + proposer + "-" + num;
  return id;
}

export function getRatifyBreakdownId(proposalId: string): string {
  return "ratify-breakdown-" + proposalId;
}

export function getRatificationVoteId(
  proposalId: string,
  voter: string,
  nonce: string,
): string {
  return "ratification-vote-" + proposalId + "-" + voter + "-" + nonce;
}

export function getRejectionVoteId(
  proposalId: string,
  voter: string,
  nonce: string,
): string {
  return "rejection-vote-" + proposalId + "-" + voter + "-" + nonce;
}

export function getRejectBreakdownId(proposalId: string): string {
  return "reject-breakdown-" + proposalId;
}

function createNominationSpend(
  proposalId: string,
  nominationsUsed: BigInt,
  proposer: string,
  proposerUser: User,
  transactionHash: string,
  txHashByes: Bytes,
): string {
  let nominationSpendId = getNominationSpendId(
    proposalId,
    nominationsUsed,
    proposer,
    getNextAvailableNonce(proposerUser).toString(),
  );

  let nominationSpend = new NominationSpend(nominationSpendId);
  // nominationSpend
  nominationSpend.user = proposer;
  nominationSpend.amount = nominationsUsed;
  nominationSpend.proposal = proposalId;
  nominationSpend.nominationsUsed = proposalId;
  nominationSpend.transactionHash = txHashByes;
  nominationSpend.save();
  return nominationSpendId;
}

function getRatificationBreakdownId(proposalId: BigInt): string {
  return "ratify-breakdown-" + proposalId.toString();
}

function getRejectionBreakdownId(proposalId: BigInt): string {
  return "reject-breakdown-" + proposalId.toString();
}
// function randomBytes32(): Bytes {
//   // Use a changing value like block timestamp; you might want to adapt this

//   let hash = crypto.keccak256(ByteArray.fromUTF8(timestamp))
//   return Bytes.fromByteArray(hash)
// }
