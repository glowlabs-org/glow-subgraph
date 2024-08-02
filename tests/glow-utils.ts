import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { Stake as StakeEvent, Unstake as UnstakeEvent } from "../generated/GLOW/GLOW";

export function createStakeEvent(user: Address, amount: BigInt): StakeEvent {
  let mockEvent = changetype<StakeEvent>(newMockEvent());
  mockEvent.parameters = new Array();

  mockEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  );
  mockEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );

  return mockEvent;
}

export function createUnstakeEvent(user: Address, amount: BigInt): UnstakeEvent {
  let mockEvent = changetype<UnstakeEvent>(newMockEvent());
  mockEvent.parameters = new Array();

  mockEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  );
  mockEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );

  return mockEvent;
}