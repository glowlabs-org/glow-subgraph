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
import { log } from '@graphprotocol/graph-ts';


describe("Glow Stake and Unstake Handlers", () => {
  afterAll(() => {
    clearStore();
  });

  test("Stake event creates an Activity and updates User totalStakedGlow", () => {
    const userAddress = "0x0000000000000000000000000000000000000001";
    const user = Address.fromString(userAddress);
    const amount = BigInt.fromI32(1000);
    const event = createStakeEvent(user, amount);

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

    // Check if User entity was updated
    const userEntity = User.load(userAddress);
    assert.assertNotNull(userEntity);
    
    if (userEntity) {
      log.info(
        "Actual totalStakedGlow: {}, Expected totalStakedGlow: {}",
        [userEntity.totalStakedGlow.toString(), amount.toString()]
      );
      assert.bigIntEquals(userEntity.totalStakedGlow, amount);
    }
  });

  test("Unstake event creates an Activity and updates User totalStakedGlow", () => {
    const userAddress = "0x0000000000000000000000000000000000000002";
    const user = Address.fromString(userAddress);
    const stakeAmount = BigInt.fromI32(2000);
    const unstakeAmount = BigInt.fromI32(1000);
    
    // First, create a stake to have some balance
    const stakeEvent = createStakeEvent(user, stakeAmount);
    handleStake(stakeEvent);
    
    // Now, create and handle the unstake event
    const unstakeEvent = createUnstakeEvent(user, unstakeAmount);
    handleUnstake(unstakeEvent);

    // Check if Activity entity was created for unstake
    const activityId = getActivityId(
      "Unstake",
      userAddress,
      unstakeEvent.transaction.hash.toHexString(),
      unstakeEvent.logIndex.toString()
    );
    const activity = Activity.load(activityId);

    assert.assertNotNull(activity);
    if (activity) {
      assert.stringEquals(activity.user, userAddress);
      assert.stringEquals(activity.activityType, "Unstake");
      assert.bigIntEquals(activity.timestamp, unstakeEvent.block.timestamp);
      assert.bytesEquals(activity.transactionHash, unstakeEvent.transaction.hash);
      assert.bigIntEquals(activity.glowAmount!, unstakeAmount);
    }

    // Check if User entity was updated correctly
    const userEntity = User.load(userAddress);
    assert.assertNotNull(userEntity);
    if (userEntity) {
      log.info(
        "Actual totalStakedGlow: {}, Expected totalStakedGlow: {}",
        [userEntity.totalStakedGlow.toString(), stakeAmount.minus(unstakeAmount).toString()]
      );
      assert.bigIntEquals(userEntity.totalStakedGlow, stakeAmount.minus(unstakeAmount));
    }
  });

  test("Multiple stake and unstake events update User totalStakedGlow correctly", () => {
    const userAddress = "0x0000000000000000000000000000000000000003";
    const user = Address.fromString(userAddress);
    
    const stake1Amount = BigInt.fromI32(1000);
    const stake2Amount = BigInt.fromI32(2000);
    const unstake1Amount = BigInt.fromI32(500);
    const stake3Amount = BigInt.fromI32(1500);
    
    handleStake(createStakeEvent(user, stake1Amount));
    handleStake(createStakeEvent(user, stake2Amount));
    handleUnstake(createUnstakeEvent(user, unstake1Amount));
    handleStake(createStakeEvent(user, stake3Amount));

    const userEntity = User.load(userAddress);
    assert.assertNotNull(userEntity);
    if (userEntity) {
      
      const expectedTotalStaked = stake1Amount
        .plus(stake2Amount)
        .minus(unstake1Amount)
        .plus(stake3Amount);

        log.info(
          "Actual totalStakedGlow: {}, Expected totalStakedGlow: {}",
          [userEntity.totalStakedGlow.toString(), expectedTotalStaked.toString()]
        );
      assert.bigIntEquals(userEntity.totalStakedGlow, expectedTotalStaked);
    }
  });
});