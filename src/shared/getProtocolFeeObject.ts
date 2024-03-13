// import { BigInt } from "@graphprotocol/graph-ts";
// import {
//   ProtocolFeePayment,
//   ProtocolFeePaymentNonceManager,
// } from "../../generated/schema";

// export function getProtocolFeeObject(): ProtocolFeePayment {
//   let protocolFeeNonceManager = ProtocolFeePaymentNonceManager.load("0");
//   if (!protocolFeeNonceManager) {
//     protocolFeeNonceManager = new ProtocolFeePaymentNonceManager("0");
//     protocolFeeNonceManager.nextNonce = BigInt.fromI32(0);
//   }
//   let nextNonce = protocolFeeNonceManager.nextNonce;
//   protocolFeeNonceManager.nextNonce = nextNonce.plus(BigInt.fromI32(1));
//   protocolFeeNonceManager.save();
//   let entity = new ProtocolFeePayment(nextNonce.toString());
//   return entity;
// }
