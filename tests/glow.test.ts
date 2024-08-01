import {
  assert,
  describe,
  test,
  clearStore,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { handleStake } from "../src/glow";
import { createStakeEvent } from "./glow-utils";
import { Activity } from "../generated/schema";

describe("Glow Stake Handler", () => {
  afterAll(() => {
    clearStore();
  });

  test("Stake event creates an Activity", () => {
    const user = Address.fromString("0x0000000000000000000000000000000000000001");
    const amount = BigInt.fromI32(1000);
    const event = createStakeEvent(user, amount);

    handleStake(event);

    // Check if Activity entity was created
    const activityId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
    const activity = Activity.load(activityId);
    
    assert.assertNotNull(activity);
    if (activity) {
      assert.stringEquals(activity.user, user.toHexString());
      assert.stringEquals(activity.activityType, "Stake");
      assert.bigIntEquals(activity.timestamp, event.block.timestamp);
      assert.bytesEquals(activity.transactionHash, event.transaction.hash);
      assert.bigIntEquals(activity.stakedGlow!, amount);
    }
  });
});