import { TotalGlowBurnedAggregate } from "../generated/schema";
import { Transfer as GlowTransferEvent } from "../generated/GLOW/GLOW";
import { BigInt } from "@graphprotocol/graph-ts";
import { CarbonCreditAuctionAddress } from "./constants/CarbonCreditAuctionAddress";

// if(event.params.to == CarbonCreditAuctionAddress)

export function handleTransfer(event: GlowTransferEvent): void {
  if (event.params.to.toHexString() == CarbonCreditAuctionAddress) {
    _handleTransferToCarbonCreditAuction(event);
  }
}

function _handleTransferToCarbonCreditAuction(event: GlowTransferEvent): void {
  let totalGlowBurned = TotalGlowBurnedAggregate.load("1");
  if (!totalGlowBurned) {
    totalGlowBurned = new TotalGlowBurnedAggregate("1");
    totalGlowBurned.totalGlowBurned = BigInt.fromU64(0);
  }

  totalGlowBurned.totalGlowBurned = totalGlowBurned.totalGlowBurned.plus(
    event.params.value,
  );
  totalGlowBurned.save();
}
