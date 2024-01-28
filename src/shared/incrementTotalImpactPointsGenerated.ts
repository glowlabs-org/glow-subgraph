import { Address, BigInt } from "@graphprotocol/graph-ts";
import { TotalImpactPointsAggregate } from "../../generated/schema";

export function incrementTotalImpactPointsGenerated(
  impactPoints: BigInt,
  usdcRetired: BigInt,
  gccRetired: BigInt,
  usdcValue: BigInt,
): void {
  let totalImpactPoints = TotalImpactPointsAggregate.load("1");
  if (!totalImpactPoints) {
    totalImpactPoints = new TotalImpactPointsAggregate("1");
    totalImpactPoints.totalImpactPoints = BigInt.fromI32(0);
    totalImpactPoints.totalGCC_Committed = BigInt.fromI32(0);
    totalImpactPoints.totalUSDC_Committed = BigInt.fromI32(0);
    totalImpactPoints.totalUSDC_Value = BigInt.fromI32(0);
  }

  totalImpactPoints.totalImpactPoints =
    totalImpactPoints.totalImpactPoints.plus(impactPoints);
  totalImpactPoints.totalGCC_Committed =
    totalImpactPoints.totalGCC_Committed.plus(gccRetired);
  totalImpactPoints.totalUSDC_Committed =
    totalImpactPoints.totalUSDC_Committed.plus(usdcRetired);
  totalImpactPoints.totalUSDC_Value =
    totalImpactPoints.totalUSDC_Value.plus(usdcValue);
  totalImpactPoints.save();
}
