import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  GuardianAdditionRequested,
  GuardianRevokationRequested,
  GuardianAdditionCancelled,
  GuardianRevokationCancelled,
  GuardianAdded,
  GuardianRevoked,
  TransactionExecuted,
  ModuleCreated,
  ModuleInitialised
} from "../generated/Contract/Contract"
import { GuardianRequest, Guardian, Transaction } from "../generated/schema"

export function handleGuardianAdditionRequested(
  event: GuardianAdditionRequested
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = GuardianRequest.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new GuardianRequest(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.wallet = event.params.wallet
  entity.guardian = event.params.guardian
  entity.executeAfter = event.params.executeAfter
  entity.time = event.block.timestamp;
  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.securityWindow(...)
  // - contract.getNonce(...)
  // - contract.guardianCount(...)
  // - contract.securityPeriod(...)
  // - contract.execute(...)
  // - contract.relayer(...)
  // - contract.isGuardian(...)
  // - contract.guardianStorage(...)
  // - contract.getGuardians(...)
}

export function handleGuardianRevokationRequested(
  event: GuardianRevokationRequested
): void {
  let entity = GuardianRequest.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new GuardianRequest(event.transaction.from.toHex())
  }
  entity.wallet = event.params.wallet
  entity.guardian = event.params.guardian
  entity.executeAfter = event.params.executeAfter
  entity.time = event.block.timestamp;
  entity.save()
}

export function handleGuardianAdditionCancelled(
  event: GuardianAdditionCancelled
): void {
  let entity = Guardian.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new Guardian(event.transaction.from.toHex())
  }
  entity.wallet = event.params.wallet
  entity.guardian = event.params.guardian
  entity.time = event.block.timestamp;
  entity.save()
}

export function handleGuardianRevokationCancelled(
  event: GuardianRevokationCancelled
): void {
  let entity = Guardian.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new Guardian(event.transaction.from.toHex())
  }
  entity.wallet = event.params.wallet
  entity.guardian = event.params.guardian
  entity.time = event.block.timestamp;
  entity.save()
}

export function handleGuardianAdded(event: GuardianAdded): void {
  let entity = Guardian.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new Guardian(event.transaction.from.toHex())
  }
  entity.wallet = event.params.wallet
  entity.guardian = event.params.guardian
  entity.time = event.block.timestamp;
  entity.save()
}

export function handleGuardianRevoked(event: GuardianRevoked): void {}

export function handleTransactionExecuted(event: TransactionExecuted): void {
  let id = event.transaction.from.toHex()
  let transaction = Transaction.load(id)
  if (transaction == null) {
    transaction = new Transaction(id)
  }
  transaction.wallet = event.params.wallet
  transaction.success = event.params.success
  transaction.signedHash = event.params.signedHash
  transaction.time = event.block.timestamp;
  transaction.save()
}

export function handleModuleCreated(event: ModuleCreated): void {}

export function handleModuleInitialised(event: ModuleInitialised): void {}
