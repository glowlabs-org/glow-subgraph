import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll,
  } from "matchstick-as/assembly/index";
  import { Address, BigInt, JSONValue } from "@graphprotocol/graph-ts";
  import { Approval as ApprovalEvent } from "../generated/GCC/GCC";
  import { createVetoCouncilElectionOrSlashEvent } from "./governance-utils";
  import { changeGCARequirementsProposalCreationHandler, getNominationSpendId, vetoCouncilElectionOrSlashHandler } from "../src/governance";
  import { NominationSpend, NominationsUsed, User, VetoCouncilElectionOrSlashProposal } from "../generated/schema";
  import { log } from '@graphprotocol/graph-ts'
import { createGCAElectionOrSlashProposalEvent } from "./governance-utils";
import {gcaCouncilElectionOrSlashCreationHandler} from "../src/governance";
  // Tests structure (matchstick-as >=0.5.0)
  // https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0
  
  describe("Describe entity assertions", () => {
    // beforeAll(() => {
    //   let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    //   let spender = Address.fromString(
    //     "0x0000000000000000000000000000000000000001"
    //   )
    //   let value = BigInt.fromI32(234)
    //   let newApprovalEvent = createApprovalEvent(owner, spender, value)
    //   handleApproval(newApprovalEvent)
    // })
  
    afterAll(() => {
      clearStore();
    });
  
    // For more test scenarios, see:
    // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test
  
    test("Create Veto Council Proposal", () => {
        let proposer = Address.fromString("0x0000000000000000000000000000000000000001");
        let oldAgent = Address.fromString("0x6884efd53b2650679996D3Ea206D116356dA08a9");
        let newAgent = Address.fromString("0x0000000000000000000000000000000000000007");
        let slashOldAgent = true;
        let nominationsUsed = BigInt.fromI32(20);
        let proposalId = BigInt.fromU32(1);

    let event = createVetoCouncilElectionOrSlashEvent(
        proposer,
        oldAgent,
        newAgent,
        slashOldAgent,
        nominationsUsed,
        proposalId, //proposal Id
    );


    vetoCouncilElectionOrSlashHandler(event);

    let entity = VetoCouncilElectionOrSlashProposal.load("1");
    if(!entity){
        throw new Error("Entity not found");
    };
    let nominationsUsedId = entity.nominationsUsed;
    if(!nominationsUsedId){
        throw new Error("NominationsUsed not found");
        return;
    }
    let nominationsUsedEntity = NominationsUsed.load(nominationsUsedId!);
    if(!nominationsUsedEntity){
        throw new Error("NominationsUsedEntity not found");
    }

    let userNonce = "0";
    let nominationSpendId = getNominationSpendId(
        proposalId.toString(),
        nominationsUsed,
        proposer.toHexString(),
        userNonce
    );
    let nominationSpend = NominationSpend.load(nominationSpendId);
    if(!nominationSpend){
        throw new Error("NominationSpend not found");
    }
    // let nominationBreakdown = NominationSpend.load(nominationsUsedEntity.nominationBreakdown.get("1")!.toString())
  
    let vetoCouncilProposalStringified = `
        id:  ${entity.id},
        proposer: ${entity.proposer},
        oldAgent: ${entity.oldAgent},
        newAgent: ${entity.newAgent},
        slashOldAgent: ${entity.slashOldAgent},
        nominationsUsed:  {
            nominationsUsed: ${nominationsUsedEntity.nominationsUsed},
            nominationBreakdown: {
                nominationId: ${nominationSpend.id},
                nominationAmount: ${nominationSpend.amount},
                nominationOwner: ${nominationSpend.user},
            }
        }
    `;
    
    log.info("vetoCouncilProposalStringified: {}", [vetoCouncilProposalStringified]);

    vetoCouncilElectionOrSlashHandler(event);

    let userAfterSecondNominationSpend = User.load(proposer.toHexString());
    if(!userAfterSecondNominationSpend){
        throw new Error("UserAfterSecondNominationSpend not found");
    }
    assert.bigIntEquals(userAfterSecondNominationSpend.nominationSpendCounter, BigInt.fromI32(2));

    let secondSpendId = getNominationSpendId(
        proposalId.toString(),
        nominationsUsed,
        proposer.toHexString(),
        "1" //0+1
    );
    let secondSpend = NominationSpend.load(secondSpendId);
    if(!secondSpend){
        throw new Error("SecondSpend not found");
    }
    let secondSpendStringified = `
        id:  ${secondSpend.id},
        user: ${secondSpend.user},
        amount: ${secondSpend.amount},
        proposal: ${secondSpend.proposal},
        nominationsUsed: ${secondSpend.nominationsUsed},
        transactionHash: ${secondSpend.transactionHash.toString()}
    `;
    log.info("secondSpendStringified: {}", [secondSpendStringified]);

      // assert.entityCount("Approval", sd1)
      // // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
      // assert.fieldEquals(
      //   "Approval",
      //   "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      //   "owner",
      //   "0x0000000000000000000000000000000000000001"
      // )
      // assert.fieldEquals(
      //   "Approval",
      //   "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      //   "spender",
      //   "0x0000000000000000000000000000000000000001"
      // )
      // assert.fieldEquals(
      //   "Approval",
      //   "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      //   "value",
      //   "234"
      // )
      // More assert options:
      // https://thegraph.com/docs/en/developer/matchstick/#asserts
    });

    test("Create GCA Council Proposal", () => {
        let proposer = Address.fromString("0xa16081f360e3847006db660bae1c6d1b2e17ec2a");
        let gcasToSlash = [
            Address.fromString("0x6884efd53b2650679996D3Ea206D116356dA08a9"),
            Address.fromString("0x6884efd53b2650679996D3Ea206D116356dA08a8"),
        ];
        let newGCAs = [
            Address.fromString("0x6884efd53b2650679996D3Ea206D116356dA08a7"),
            Address.fromString("0x6884efd53b2650679996D3Ea206D116356dA08a6"),
        ];
        let nominationsUsed = BigInt.fromI32(20);
        let proposalId = BigInt.fromU32(1);
        let timestamp = BigInt.fromI32(1234567890);

    let event = createGCAElectionOrSlashProposalEvent(
        proposer,
        gcasToSlash,
        newGCAs,
        nominationsUsed,
        timestamp,
        proposalId, //proposal Id
    );

    gcaCouncilElectionOrSlashCreationHandler(event);
    });
    
  });
  