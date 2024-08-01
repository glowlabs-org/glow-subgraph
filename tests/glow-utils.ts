import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { Stake as StakeEvent } from "../generated/GLOW/GLOW";

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