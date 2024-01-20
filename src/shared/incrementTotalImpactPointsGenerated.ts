import { Address, BigInt } from "@graphprotocol/graph-ts";
import { TotalImpactPointsAggregate } from "../../generated/schema";

export function incrementTotalImpactPointsGenerated(amount: BigInt): void {
  let totalImpactPoints = TotalImpactPointsAggregate.load("1");
  if (!totalImpactPoints) {
    totalImpactPoints = new TotalImpactPointsAggregate("1");
    totalImpactPoints.totalImpactPoints = BigInt.fromI32(0);
  }

  totalImpactPoints.totalImpactPoints =
    totalImpactPoints.totalImpactPoints.plus(amount);
  totalImpactPoints.save();
}
