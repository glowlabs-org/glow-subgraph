import {
  GCCRetired as GCCRetiredEvent,
} from "../generated/GCC/GCC"
import {
  GCCRetired,
} from "../generated/schema"
import { User } from "../generated/schema"
export function handleGCCRetired(event: GCCRetiredEvent): void {
  let entity = new GCCRetired(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let from = User.load(event.params.account.toHexString());
  if(!from) {
    from = new User(event.params.account.toHexString());
    from.save();
  }
  let rewardAddress = User.load(event.params.rewardAddress.toHexString());
  if(!rewardAddress) {
    rewardAddress = new User(event.params.rewardAddress.toHexString());
    rewardAddress.save();
  }

  entity.account = from.id;
  entity.rewardAddress = rewardAddress.id;
  entity.amount = event.params.amount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
