import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  EIP712DomainChanged,
  GCCRetired,
  RetireGCCAllowance,
  Transfer
} from "../generated/GCC/GCC"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createEIP712DomainChangedEvent(): EIP712DomainChanged {
  let eip712DomainChangedEvent = changetype<EIP712DomainChanged>(newMockEvent())

  eip712DomainChangedEvent.parameters = new Array()

  return eip712DomainChangedEvent
}

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

export function createRetireGCCAllowanceEvent(
  account: Address,
  spender: Address,
  value: BigInt
): RetireGCCAllowance {
  let retireGccAllowanceEvent = changetype<RetireGCCAllowance>(newMockEvent())

  retireGccAllowanceEvent.parameters = new Array()

  retireGccAllowanceEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  retireGccAllowanceEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  retireGccAllowanceEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return retireGccAllowanceEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
