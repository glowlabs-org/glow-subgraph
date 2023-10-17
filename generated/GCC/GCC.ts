// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class EIP712DomainChanged extends ethereum.Event {
  get params(): EIP712DomainChanged__Params {
    return new EIP712DomainChanged__Params(this);
  }
}

export class EIP712DomainChanged__Params {
  _event: EIP712DomainChanged;

  constructor(event: EIP712DomainChanged) {
    this._event = event;
  }
}

export class GCCRetired extends ethereum.Event {
  get params(): GCCRetired__Params {
    return new GCCRetired__Params(this);
  }
}

export class GCCRetired__Params {
  _event: GCCRetired;

  constructor(event: GCCRetired) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get rewardAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class RetireGCCAllowance extends ethereum.Event {
  get params(): RetireGCCAllowance__Params {
    return new RetireGCCAllowance__Params(this);
  }
}

export class RetireGCCAllowance__Params {
  _event: RetireGCCAllowance;

  constructor(event: RetireGCCAllowance) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class GCC__eip712DomainResult {
  value0: Bytes;
  value1: string;
  value2: string;
  value3: BigInt;
  value4: Address;
  value5: Bytes;
  value6: Array<BigInt>;

  constructor(
    value0: Bytes,
    value1: string,
    value2: string,
    value3: BigInt,
    value4: Address,
    value5: Bytes,
    value6: Array<BigInt>
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytes(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromAddress(this.value4));
    map.set("value5", ethereum.Value.fromFixedBytes(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigIntArray(this.value6));
    return map;
  }

  getFields(): Bytes {
    return this.value0;
  }

  getName(): string {
    return this.value1;
  }

  getVersion(): string {
    return this.value2;
  }

  getChainId(): BigInt {
    return this.value3;
  }

  getVerifyingContract(): Address {
    return this.value4;
  }

  getSalt(): Bytes {
    return this.value5;
  }

  getExtensions(): Array<BigInt> {
    return this.value6;
  }
}

export class GCC extends ethereum.SmartContract {
  static bind(address: Address): GCC {
    return new GCC("GCC", address);
  }

  CARBON_CREDIT_AUCTION(): Address {
    let result = super.call(
      "CARBON_CREDIT_AUCTION",
      "CARBON_CREDIT_AUCTION():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_CARBON_CREDIT_AUCTION(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "CARBON_CREDIT_AUCTION",
      "CARBON_CREDIT_AUCTION():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  GCA_AND_MINER_POOL_CONTRACT(): Address {
    let result = super.call(
      "GCA_AND_MINER_POOL_CONTRACT",
      "GCA_AND_MINER_POOL_CONTRACT():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_GCA_AND_MINER_POOL_CONTRACT(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "GCA_AND_MINER_POOL_CONTRACT",
      "GCA_AND_MINER_POOL_CONTRACT():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  GLOW(): Address {
    let result = super.call("GLOW", "GLOW():(address)", []);

    return result[0].toAddress();
  }

  try_GLOW(): ethereum.CallResult<Address> {
    let result = super.tryCall("GLOW", "GLOW():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  GOVERNANCE(): Address {
    let result = super.call("GOVERNANCE", "GOVERNANCE():(address)", []);

    return result[0].toAddress();
  }

  try_GOVERNANCE(): ethereum.CallResult<Address> {
    let result = super.tryCall("GOVERNANCE", "GOVERNANCE():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  RETIRING_PERMIT_TYPEHASH(): Bytes {
    let result = super.call(
      "RETIRING_PERMIT_TYPEHASH",
      "RETIRING_PERMIT_TYPEHASH():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_RETIRING_PERMIT_TYPEHASH(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "RETIRING_PERMIT_TYPEHASH",
      "RETIRING_PERMIT_TYPEHASH():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  allowance(owner: Address, spender: Address): BigInt {
    let result = super.call(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(spender)]
    );

    return result[0].toBigInt();
  }

  try_allowance(owner: Address, spender: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(spender)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  approve(spender: Address, value: BigInt): boolean {
    let result = super.call("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(spender),
      ethereum.Value.fromUnsignedBigInt(value)
    ]);

    return result[0].toBoolean();
  }

  try_approve(spender: Address, value: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(spender),
      ethereum.Value.fromUnsignedBigInt(value)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  balanceOf(account: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  decreaseAllowance(spender: Address, requestedDecrease: BigInt): boolean {
    let result = super.call(
      "decreaseAllowance",
      "decreaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(requestedDecrease)
      ]
    );

    return result[0].toBoolean();
  }

  try_decreaseAllowance(
    spender: Address,
    requestedDecrease: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "decreaseAllowance",
      "decreaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(requestedDecrease)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  domainSeparatorV4(): Bytes {
    let result = super.call(
      "domainSeparatorV4",
      "domainSeparatorV4():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_domainSeparatorV4(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "domainSeparatorV4",
      "domainSeparatorV4():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  eip712Domain(): GCC__eip712DomainResult {
    let result = super.call(
      "eip712Domain",
      "eip712Domain():(bytes1,string,string,uint256,address,bytes32,uint256[])",
      []
    );

    return new GCC__eip712DomainResult(
      result[0].toBytes(),
      result[1].toString(),
      result[2].toString(),
      result[3].toBigInt(),
      result[4].toAddress(),
      result[5].toBytes(),
      result[6].toBigIntArray()
    );
  }

  try_eip712Domain(): ethereum.CallResult<GCC__eip712DomainResult> {
    let result = super.tryCall(
      "eip712Domain",
      "eip712Domain():(bytes1,string,string,uint256,address,bytes32,uint256[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new GCC__eip712DomainResult(
        value[0].toBytes(),
        value[1].toString(),
        value[2].toString(),
        value[3].toBigInt(),
        value[4].toAddress(),
        value[5].toBytes(),
        value[6].toBigIntArray()
      )
    );
  }

  increaseAllowance(spender: Address, addedValue: BigInt): boolean {
    let result = super.call(
      "increaseAllowance",
      "increaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(addedValue)
      ]
    );

    return result[0].toBoolean();
  }

  try_increaseAllowance(
    spender: Address,
    addedValue: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "increaseAllowance",
      "increaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(addedValue)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isBucketMinted(bucketId: BigInt): boolean {
    let result = super.call(
      "isBucketMinted",
      "isBucketMinted(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(bucketId)]
    );

    return result[0].toBoolean();
  }

  try_isBucketMinted(bucketId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isBucketMinted",
      "isBucketMinted(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(bucketId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  nextRetiringNonce(param0: Address): BigInt {
    let result = super.call(
      "nextRetiringNonce",
      "nextRetiringNonce(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_nextRetiringNonce(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "nextRetiringNonce",
      "nextRetiringNonce(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  retiringAllowance(account: Address, spender: Address): BigInt {
    let result = super.call(
      "retiringAllowance",
      "retiringAllowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(account), ethereum.Value.fromAddress(spender)]
    );

    return result[0].toBigInt();
  }

  try_retiringAllowance(
    account: Address,
    spender: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "retiringAllowance",
      "retiringAllowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(account), ethereum.Value.fromAddress(spender)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalCreditsRetired(param0: Address): BigInt {
    let result = super.call(
      "totalCreditsRetired",
      "totalCreditsRetired(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_totalCreditsRetired(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalCreditsRetired",
      "totalCreditsRetired(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transfer(to: Address, value: BigInt): boolean {
    let result = super.call("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(to),
      ethereum.Value.fromUnsignedBigInt(value)
    ]);

    return result[0].toBoolean();
  }

  try_transfer(to: Address, value: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(to),
      ethereum.Value.fromUnsignedBigInt(value)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  transferFrom(from: Address, to: Address, value: BigInt): boolean {
    let result = super.call(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(value)
      ]
    );

    return result[0].toBoolean();
  }

  try_transferFrom(
    from: Address,
    to: Address,
    value: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(value)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _gcaAndMinerPoolContract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _governance(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _glowToken(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DecreaseAllowanceCall extends ethereum.Call {
  get inputs(): DecreaseAllowanceCall__Inputs {
    return new DecreaseAllowanceCall__Inputs(this);
  }

  get outputs(): DecreaseAllowanceCall__Outputs {
    return new DecreaseAllowanceCall__Outputs(this);
  }
}

export class DecreaseAllowanceCall__Inputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get requestedDecrease(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DecreaseAllowanceCall__Outputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DecreaseAllowancesCall extends ethereum.Call {
  get inputs(): DecreaseAllowancesCall__Inputs {
    return new DecreaseAllowancesCall__Inputs(this);
  }

  get outputs(): DecreaseAllowancesCall__Outputs {
    return new DecreaseAllowancesCall__Outputs(this);
  }
}

export class DecreaseAllowancesCall__Inputs {
  _call: DecreaseAllowancesCall;

  constructor(call: DecreaseAllowancesCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get requestedDecrease(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DecreaseAllowancesCall__Outputs {
  _call: DecreaseAllowancesCall;

  constructor(call: DecreaseAllowancesCall) {
    this._call = call;
  }
}

export class DecreaseRetiringAllowanceCall extends ethereum.Call {
  get inputs(): DecreaseRetiringAllowanceCall__Inputs {
    return new DecreaseRetiringAllowanceCall__Inputs(this);
  }

  get outputs(): DecreaseRetiringAllowanceCall__Outputs {
    return new DecreaseRetiringAllowanceCall__Outputs(this);
  }
}

export class DecreaseRetiringAllowanceCall__Inputs {
  _call: DecreaseRetiringAllowanceCall;

  constructor(call: DecreaseRetiringAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DecreaseRetiringAllowanceCall__Outputs {
  _call: DecreaseRetiringAllowanceCall;

  constructor(call: DecreaseRetiringAllowanceCall) {
    this._call = call;
  }
}

export class IncreaseAllowanceCall extends ethereum.Call {
  get inputs(): IncreaseAllowanceCall__Inputs {
    return new IncreaseAllowanceCall__Inputs(this);
  }

  get outputs(): IncreaseAllowanceCall__Outputs {
    return new IncreaseAllowanceCall__Outputs(this);
  }
}

export class IncreaseAllowanceCall__Inputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get addedValue(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class IncreaseAllowanceCall__Outputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class IncreaseAllowancesCall extends ethereum.Call {
  get inputs(): IncreaseAllowancesCall__Inputs {
    return new IncreaseAllowancesCall__Inputs(this);
  }

  get outputs(): IncreaseAllowancesCall__Outputs {
    return new IncreaseAllowancesCall__Outputs(this);
  }
}

export class IncreaseAllowancesCall__Inputs {
  _call: IncreaseAllowancesCall;

  constructor(call: IncreaseAllowancesCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get addedValue(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class IncreaseAllowancesCall__Outputs {
  _call: IncreaseAllowancesCall;

  constructor(call: IncreaseAllowancesCall) {
    this._call = call;
  }
}

export class IncreaseRetiringAllowanceCall extends ethereum.Call {
  get inputs(): IncreaseRetiringAllowanceCall__Inputs {
    return new IncreaseRetiringAllowanceCall__Inputs(this);
  }

  get outputs(): IncreaseRetiringAllowanceCall__Outputs {
    return new IncreaseRetiringAllowanceCall__Outputs(this);
  }
}

export class IncreaseRetiringAllowanceCall__Inputs {
  _call: IncreaseRetiringAllowanceCall;

  constructor(call: IncreaseRetiringAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class IncreaseRetiringAllowanceCall__Outputs {
  _call: IncreaseRetiringAllowanceCall;

  constructor(call: IncreaseRetiringAllowanceCall) {
    this._call = call;
  }
}

export class MintToCarbonCreditAuctionCall extends ethereum.Call {
  get inputs(): MintToCarbonCreditAuctionCall__Inputs {
    return new MintToCarbonCreditAuctionCall__Inputs(this);
  }

  get outputs(): MintToCarbonCreditAuctionCall__Outputs {
    return new MintToCarbonCreditAuctionCall__Outputs(this);
  }
}

export class MintToCarbonCreditAuctionCall__Inputs {
  _call: MintToCarbonCreditAuctionCall;

  constructor(call: MintToCarbonCreditAuctionCall) {
    this._call = call;
  }

  get bucketId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class MintToCarbonCreditAuctionCall__Outputs {
  _call: MintToCarbonCreditAuctionCall;

  constructor(call: MintToCarbonCreditAuctionCall) {
    this._call = call;
  }
}

export class RetireGCCCall extends ethereum.Call {
  get inputs(): RetireGCCCall__Inputs {
    return new RetireGCCCall__Inputs(this);
  }

  get outputs(): RetireGCCCall__Outputs {
    return new RetireGCCCall__Outputs(this);
  }
}

export class RetireGCCCall__Inputs {
  _call: RetireGCCCall;

  constructor(call: RetireGCCCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get rewardAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RetireGCCCall__Outputs {
  _call: RetireGCCCall;

  constructor(call: RetireGCCCall) {
    this._call = call;
  }
}

export class RetireGCCForCall extends ethereum.Call {
  get inputs(): RetireGCCForCall__Inputs {
    return new RetireGCCForCall__Inputs(this);
  }

  get outputs(): RetireGCCForCall__Outputs {
    return new RetireGCCForCall__Outputs(this);
  }
}

export class RetireGCCForCall__Inputs {
  _call: RetireGCCForCall;

  constructor(call: RetireGCCForCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get rewardAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class RetireGCCForCall__Outputs {
  _call: RetireGCCForCall;

  constructor(call: RetireGCCForCall) {
    this._call = call;
  }
}

export class RetireGCCForAuthorizedCall extends ethereum.Call {
  get inputs(): RetireGCCForAuthorizedCall__Inputs {
    return new RetireGCCForAuthorizedCall__Inputs(this);
  }

  get outputs(): RetireGCCForAuthorizedCall__Outputs {
    return new RetireGCCForAuthorizedCall__Outputs(this);
  }
}

export class RetireGCCForAuthorizedCall__Inputs {
  _call: RetireGCCForAuthorizedCall;

  constructor(call: RetireGCCForAuthorizedCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get rewardAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get signature(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class RetireGCCForAuthorizedCall__Outputs {
  _call: RetireGCCForAuthorizedCall;

  constructor(call: RetireGCCForAuthorizedCall) {
    this._call = call;
  }
}

export class SetAllowancesCall extends ethereum.Call {
  get inputs(): SetAllowancesCall__Inputs {
    return new SetAllowancesCall__Inputs(this);
  }

  get outputs(): SetAllowancesCall__Outputs {
    return new SetAllowancesCall__Outputs(this);
  }
}

export class SetAllowancesCall__Inputs {
  _call: SetAllowancesCall;

  constructor(call: SetAllowancesCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get transferAllowance(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get retiringAllowance(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SetAllowancesCall__Outputs {
  _call: SetAllowancesCall;

  constructor(call: SetAllowancesCall) {
    this._call = call;
  }
}

export class TransferCall extends ethereum.Call {
  get inputs(): TransferCall__Inputs {
    return new TransferCall__Inputs(this);
  }

  get outputs(): TransferCall__Outputs {
    return new TransferCall__Outputs(this);
  }
}

export class TransferCall__Inputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferCall__Outputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get value(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}
