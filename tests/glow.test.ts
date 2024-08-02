import {
  assert,
  describe,
  test,
  clearStore,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { handleStake, handleUnstake } from "../src/glow";
import { createStakeEvent, createUnstakeEvent } from "./glow-utils";
import { Activity, User } from "../generated/schema";
import { getActivityId } from "../src/shared/createActivity";
import { getOrCreateUser } from "../src/shared/getOrCreateUser";

describe("Glow Stake and Unstake Handlers", () => {
  afterAll(() => {
    clearStore();
  });

  test("Stake event creates an Activity", () => {
    const userAddress = "0x0000000000000000000000000000000000000001";
    const user = Address.fromString(userAddress);
    const amount = BigInt.fromI32(1000);
    const event = createStakeEvent(user, amount);

    // Create a User entity first
    let newUser = getOrCreateUser(user)
    newUser.save();
    
    handleStake(event);
    // Check if Activity entity was created
    const activityId = getActivityId(
      "Stake",
      userAddress,
      event.transaction.hash.toHexString(),
      event.logIndex.toString()
    );
    const activity = Activity.load(activityId);

    assert.assertNotNull(activity);
    if (activity) {
      assert.stringEquals(activity.user, userAddress);
      assert.stringEquals(activity.activityType, "Stake");
      assert.bigIntEquals(activity.timestamp, event.block.timestamp);
      assert.bytesEquals(activity.transactionHash, event.transaction.hash);
      assert.bigIntEquals(activity.glowAmount!, amount);
    }
  });

  test("Unstake event creates an Activity", () => {
    const userAddress = "0x0000000000000000000000000000000000000001";
    const user = Address.fromString(userAddress);
    const amount = BigInt.fromI32(1000);
    const event = createUnstakeEvent(user, amount);

    // Create a User entity first
    let newUser = getOrCreateUser(user)
    newUser.save();
    
    handleUnstake(event);

    // Check if Activity entity was created
    const activityId = getActivityId(
      "Unstake",
      userAddress,
      event.transaction.hash.toHexString(),
      event.logIndex.toString()
    );
    const activity = Activity.load(activityId);

    assert.assertNotNull(activity);
    if (activity) {
      assert.stringEquals(activity.user, userAddress);
      assert.stringEquals(activity.activityType, "Unstake");
      assert.bigIntEquals(activity.timestamp, event.block.timestamp);
      assert.bytesEquals(activity.transactionHash, event.transaction.hash);
      assert.bigIntEquals(activity.glowAmount!, amount);
    }
  });
});