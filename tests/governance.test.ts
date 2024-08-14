import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll,
  } from "matchstick-as/assembly/index";
  import { Address, BigInt} from "@graphprotocol/graph-ts";
  import { Approval as ApprovalEvent } from "../generated/GCC/GCC";
  import { createVetoCouncilElectionOrSlashEvent } from "./governance-utils";
  import { changeGCARequirementsProposalCreationHandler, getMostPopularProposalId, getNominationSpendId, mostPopularProposalSetHandler, ratifyCastHandler, rejectCastHandler, vetoCouncilElectionOrSlashHandler } from "../src/governance";
  import { MostPopularProposal, NominationSpend, NominationsUsed, RatificationVoteBreakdown, RejectionVoteBreakdown, User, VetoCouncilElectionOrSlashProposal, Activity } from "../generated/schema";
  import { log } from '@graphprotocol/graph-ts'
import { createGCAElectionOrSlashProposalEvent } from "./governance-utils";
import {gcaCouncilElectionOrSlashCreationHandler} from "../src/governance";
import { createRejectCastEvent } from "./governance-utils";
import { createRatifyCastEvent } from "./governance-utils";
import { createMostPopularProposalSetEvent } from "./governance-utils";
import { getActivityId } from "../src/shared/createActivity";
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
  
    test("Create Veto Council Proposal And Check Activity", () => {
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
    assert.bigIntEquals(userAfterSecondNominationSpend.nonceSeperator, BigInt.fromI32(2));

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

      const activityId = getActivityId(
        "Create",
        proposer.toHexString(),
        event.transaction.hash.toHexString(),
        event.logIndex.toString()
      );

      const activity = Activity.load(activityId);

      assert.assertNotNull(activity);
      if (activity) {
        assert.stringEquals(activity.user, proposer.toHexString());
        assert.stringEquals(activity.activityType, "Create");
        assert.bigIntEquals(activity.timestamp, event.block.timestamp);
        assert.bytesEquals(activity.transactionHash, event.transaction.hash);
        assert.stringEquals(activity.proposal!, proposalId.toString());
      }
    });

    test("Create GCA Council Proposal and Check Activity", () => {
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

    const activityId = getActivityId(
        "Create",
        proposer.toHexString(),
        event.transaction.hash.toHexString(),
        event.logIndex.toString()
      );

      const activity = Activity.load(activityId);

      assert.assertNotNull(activity);
      if (activity) {
        assert.stringEquals(activity.user, proposer.toHexString());
        assert.stringEquals(activity.activityType, "Create");
        assert.bigIntEquals(activity.timestamp, event.block.timestamp);
        assert.bytesEquals(activity.transactionHash, event.transaction.hash);
        assert.stringEquals(activity.proposal!, proposalId.toString());
      }
    });
    
    test("Create Ratify Proposal and check Activity", () => { 
        let proposer = Address.fromString("0xa16081f360e3847006db660bae1c6d1b2e17ec2a");
        let proposalId = BigInt.fromU32(1);
        let numVotes = BigInt.fromI32(20);
    
        let event = createRatifyCastEvent(
            proposalId,
            proposer,
            numVotes,
        );
        
        ratifyCastHandler(event);
    
        const activityId = getActivityId(
          "Ratify",
          event.params.voter.toHexString(),
          event.transaction.hash.toHexString(),
          event.logIndex.toString()
        );
        
        log.info("Looking for activity with ID: {}", [`id: ${activityId}`]);
        
        const activity = Activity.load(activityId);
        
        assert.assertNotNull(activity);
        
        if (activity) {
          assert.stringEquals(activity.user, proposer.toHexString());
          assert.stringEquals(activity.activityType, "Ratify");
          assert.bigIntEquals(activity.timestamp, event.block.timestamp);
          assert.bytesEquals(activity.transactionHash, event.transaction.hash);
          assert.stringEquals(activity.proposal!, proposalId.toString());
          assert.bigIntEquals(activity.votes!, numVotes);
        }
    });

    
      test("Create Reject Proposal and check Activity", () => { 
        let proposer = Address.fromString("0xa16081f360e3847006db660bae1c6d1b2e17ec2a");
        let proposalId = BigInt.fromU32(1);
        let numVotes = BigInt.fromI32(20);

        let event = createRejectCastEvent(
            proposalId,
            proposer,
            numVotes,
        );
    
        rejectCastHandler(event);
    
        // Check if Activity entity was created
        const activityId = getActivityId(
          "Reject",
          proposer.toHexString(),
          event.transaction.hash.toHexString(),
          event.logIndex.toString()
        );
        const activity = Activity.load(activityId);
    
        assert.assertNotNull(activity);
        if (activity) {
          assert.stringEquals(activity.user, proposer.toHexString());
          assert.stringEquals(activity.activityType, "Reject");
          assert.bigIntEquals(activity.timestamp, event.block.timestamp);
          assert.bytesEquals(activity.transactionHash, event.transaction.hash);
          assert.stringEquals(activity.proposal!, proposalId.toString());
        }
      });

   

    test("Create Most Popular Proposal Set", () => { 
        const weekId = BigInt.fromI32(0);
        let proposalId = BigInt.fromU32(1);
        let event = createMostPopularProposalSetEvent(
            weekId,
            proposalId,
        );

        mostPopularProposalSetHandler(event);

        let mppId =  getMostPopularProposalId(proposalId);
        let mostPopularEntity = MostPopularProposal.load(mppId);
        if(!mostPopularEntity){
            throw new Error("MostPopularEntity not found");
        }

        // if(mostPopularEntity.isVetoed == true) throw new Error("MostPopularEntity isVetoed should be false");
        // if(mostPopularEntity.proposal != "1") throw new Error("MostPopularEntity isRatified should be false");
        // let ratificationBreakdown = RatificationVoteBreakdown.load(mostPopularEntity.ratificationVoteBreakdown);
        // if(!ratificationBreakdown){
        //     throw new Error("RatificationBreakdown not found");
        // }
        // let rejectionBreakdown = RejectionVoteBreakdown.load(mostPopularEntity.rejectionVoteBreakdown);
        // if(!rejectionBreakdown){
        //     throw new Error("RejectionBreakdown not found");
        // }

        

    });
  });
