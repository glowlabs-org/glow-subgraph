import {
  RFCProposalCreation,
  VetoCouncilElectionOrSlash as VetoCouncilElectionOrSlashEvent,
} from "../generated/Governance/Governance";
import {
  NominationSpend,
  NominationsUsed,
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

export function vetoCouncilElectionOrSlashHandler(
  event: VetoCouncilElectionOrSlashEvent,
): void {
  // let from =  getOrCreateUser(event.params.proposer);

  let entity = new VetoCouncilElectionOrSlashProposal(
    event.params.proposalId.toString()
  );

  let proposer =  getOrCreateUser(event.params.proposer);
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
}

export function gcaCouncilElectionOrSlashCreationHandler(
  event: GCACouncilElectionOrSlashCreationEvent,
): void {
  let proposer = getOrCreateUser(event.params.proposer);
  let newGCAs = event.params.newGCAs;
  let agentsToSlash = event.params.agentsToSlash;
  let newGCAIds:string[]= [];
  let agentsToSlashIds:string[] = [];
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
}

export function grantsProposalCreationHandler(
  event: GrantsProposalCreationEvent,
): void {
  let proposer = getOrCreateUser(event.params.proposer);

  let recipient =  getOrCreateUser(event.params.recipient);
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
}

export function changeGCARequirementsProposalCreationHandler(
  event: ChangeGCARequirementsProposalCreationEvent,
): void {
  let proposer =  getOrCreateUser(event.params.proposer);

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
}

export function getNominationSpendId(
  proposalId: string,
  nominationsUsed: BigInt,
  proposer: string,
  nonce: string,

): string {
  let num = "0"
  let id = proposalId + "-" + nominationsUsed.toString() + "-" + proposer +  "-" + num;
  return id;
}

function createNominationSpend(
  proposalId: string,
  nominationsUsed: BigInt,
  proposer: string,
  proposerUser:User,
  transactionHash:string,
  txHashByes:Bytes,
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


// function randomBytes32(): Bytes {
//   // Use a changing value like block timestamp; you might want to adapt this

//   let hash = crypto.keccak256(ByteArray.fromUTF8(timestamp))
//   return Bytes.fromByteArray(hash)
// }

function getNextAvailableNonce(
  user: User,
): BigInt {
  const counter = user.nominationSpendCounter;
  const ONE = BigInt.fromU32(1);
  const nextNonce = user.nominationSpendCounter.plus(ONE);
  user.nominationSpendCounter = nextNonce;
  user.save();
  return counter;
}