import { Address, BigInt } from "@graphprotocol/graph-ts";
import { User } from "../../generated/schema";

export function getOrCreateUser(id: Address): User {
  let user = User.load(id.toHexString());
  if (!user) {
    user = new User(id.toHexString());
    user.totalUSDCEffect = BigInt.fromI32(0);
    user.nominationSpendCounter = BigInt.fromI32(0);
    user.save();
  }
  return user as User;
}
