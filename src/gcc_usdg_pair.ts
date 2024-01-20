import { Swap as SwapEvent } from "../generated/GLOW_USDG_UniswapV2Pair/UniswapV2Pair";
import { BigInt } from "@graphprotocol/graph-ts";
import { Total_USDG_GCC_Pair_Aggregate } from "../generated/schema";

export function handleSwap(event: SwapEvent): void {
  let total_GCC_USDG_Pair = Total_USDG_GCC_Pair_Aggregate.load("1");
  if (!total_GCC_USDG_Pair) {
    total_GCC_USDG_Pair = new Total_USDG_GCC_Pair_Aggregate("1");
    total_GCC_USDG_Pair.totalAmountOneIn = BigInt.fromI32(0);
    total_GCC_USDG_Pair.totalAmountOneOut = BigInt.fromI32(0);
    total_GCC_USDG_Pair.totalAmountZeroIn = BigInt.fromI32(0);
    total_GCC_USDG_Pair.totalAmountZeroOut = BigInt.fromI32(0);
  }

  if (event.params.amount0In.equals(BigInt.fromI32(0))) {
    total_GCC_USDG_Pair.totalAmountOneIn =
      total_GCC_USDG_Pair.totalAmountOneIn.plus(event.params.amount1In);
  } else {
    total_GCC_USDG_Pair.totalAmountZeroIn =
      total_GCC_USDG_Pair.totalAmountZeroIn.plus(event.params.amount0In);
  }

  if (event.params.amount0Out.equals(BigInt.fromI32(0))) {
    total_GCC_USDG_Pair.totalAmountOneOut =
      total_GCC_USDG_Pair.totalAmountOneOut.plus(event.params.amount1Out);
  } else {
    total_GCC_USDG_Pair.totalAmountZeroOut =
      total_GCC_USDG_Pair.totalAmountZeroOut.plus(event.params.amount0Out);
  }

  total_GCC_USDG_Pair.save();
}
