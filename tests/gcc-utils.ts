import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { GCCCommitted } from "../generated/GCC/GCC";
export function createGCCRetiredEvent(
  account: Address,
  rewardAddress: Address,
  gccCommitted: BigInt,
  usdcEffect: BigInt,
  impactPower: BigInt,
  referralAddress: Address,
): GCCCommitted {
  let gccRetiredEvent = changetype<GCCCommitted>(newMockEvent());


  gccRetiredEvent.parameters = new Array();

  gccRetiredEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account)),
  );
  gccRetiredEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAddress",
      ethereum.Value.fromAddress(rewardAddress),
    ),
  );
  gccRetiredEvent.parameters.push(
    new ethereum.EventParam(
      "gccAmount",
      ethereum.Value.fromUnsignedBigInt(gccCommitted),
    ),
  );

  gccRetiredEvent.parameters.push(
    new ethereum.EventParam(
      "usdcEffect",
      ethereum.Value.fromUnsignedBigInt(usdcEffect),
    ),
  );

  gccRetiredEvent.parameters.push(
    new ethereum.EventParam(
      "impactPower",
      ethereum.Value.fromUnsignedBigInt(impactPower),
    ),
  );

  gccRetiredEvent.parameters.push(
    new ethereum.EventParam(
      "referralAddress",
      ethereum.Value.fromAddress(referralAddress),
    ),
  );





  return gccRetiredEvent;
}
