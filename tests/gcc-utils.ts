import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  GCCRetired,
} from "../generated/GCC/GCC"


export function createGCCRetiredEvent(
  account: Address,
  rewardAddress: Address,
  amount: BigInt
): GCCRetired {
  let gccRetiredEvent = changetype<GCCRetired>(newMockEvent())

  gccRetiredEvent.parameters = new Array()

  gccRetiredEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  gccRetiredEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAddress",
      ethereum.Value.fromAddress(rewardAddress)
    )
  )
  gccRetiredEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return gccRetiredEvent
}


