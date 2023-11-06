import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import {VetoCouncilElectionOrSlash as VetoCouncilElectionOrSlashEvent} from "../generated/Governance/Governance";
import { GCACouncilElectionOrSlashCreation } from "../generated/Governance/Governance";

export function createVetoCouncilElectionOrSlashEvent(
    proposer: Address,
    oldAgent: Address,
    newAgent: Address,
    slashOldAgent: boolean,
    nominationsUsed: BigInt,
    proposalId: BigInt): VetoCouncilElectionOrSlashEvent {

    
    let mockEvent =   changetype<VetoCouncilElectionOrSlashEvent>(newMockEvent());
    mockEvent.parameters = new Array();
    let proposalEthereumValue = ethereum.Value.fromUnsignedBigInt(proposalId);

    mockEvent.parameters.push(
        new ethereum.EventParam("proposalId", proposalEthereumValue),
    );

    mockEvent.parameters.push(
        new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer)),
    );
    mockEvent.parameters.push(
        new ethereum.EventParam("oldAgent", ethereum.Value.fromAddress(oldAgent)),
    );
    mockEvent.parameters.push(
        new ethereum.EventParam("newAgent", ethereum.Value.fromAddress(newAgent)),
    );
    mockEvent.parameters.push(
        new ethereum.EventParam("slashOldAgent", ethereum.Value.fromBoolean(slashOldAgent)),
    );
    mockEvent.parameters.push(
        new ethereum.EventParam("nominationsUsed", ethereum.Value.fromUnsignedBigInt(nominationsUsed)),
    );


  
    return mockEvent;

    }

    export function createGCAElectionOrSlashProposalEvent(
        proposer: Address,
        gcasToSlash: Address[],
        newGCAs: Address[],
        nominationsUsed: BigInt,
        timestamp: BigInt,
        proposalId: BigInt): GCACouncilElectionOrSlashCreation {
    
        
        let mockEvent =changetype<GCACouncilElectionOrSlashCreation>(newMockEvent());
        mockEvent.parameters = new Array();

        let proposalEthereumValue = ethereum.Value.fromUnsignedBigInt(proposalId);
        /*
            event GCACouncilElectionOrSlashCreation(
        uint256 indexed proposalId,
        address indexed proposer,
        address[] agentsToSlash,
        address[] newGCAs,
        uint256 proposalCreationTimestamp,
        uint256 nominationsUsed
    );
    */
                
        mockEvent.parameters.push(
            new ethereum.EventParam("proposalId", proposalEthereumValue),
        );

        mockEvent.parameters.push(
            new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer)),
        );
        

        mockEvent.parameters.push(
            new ethereum.EventParam("agentsToSlash", ethereum.Value.fromAddressArray(gcasToSlash)),
        );


        mockEvent.parameters.push(
            new ethereum.EventParam("newGCAs", ethereum.Value.fromAddressArray(newGCAs)),
        );
        
        mockEvent.parameters.push(
            new ethereum.EventParam("proposalCreationTimestamp", ethereum.Value.fromUnsignedBigInt(timestamp)),
        );

        mockEvent.parameters.push(
            new ethereum.EventParam("nominationsUsed", ethereum.Value.fromUnsignedBigInt(nominationsUsed)),
        );

    
      
        return mockEvent;
    
        }