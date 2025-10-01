import { Ledger } from "./managed/zkVote/contract/index.cjs";
import { WitnessContext } from "@midnight-ntwrk/compact-runtime";

export type ZkPrivateState = {
  readonly local_secret: Uint8Array;
  readonly shared_secret: Uint8Array;
};

export function createZkPrivateState(
  local_secret: Uint8Array,
  shared_secret: Uint8Array
): ZkPrivateState {
  return {
    local_secret,
    shared_secret
  };
}

export const witnesses = {
  getLocalSecret: ({
    privateState
  }: WitnessContext<Ledger, ZkPrivateState>): [
    ZkPrivateState,
    Uint8Array
  ] => {
    if (privateState.local_secret) {
      return [privateState, privateState.local_secret];
    } else {
      throw new Error("No local secret found.");
    }
  },
  getSharedSecret: ({
    privateState
  }: WitnessContext<Ledger, ZkPrivateState>): [
    ZkPrivateState,
    Uint8Array
  ] => {
    if (privateState.local_secret) {
      return [privateState, privateState.shared_secret];
    } else {
      throw new Error("No shared secret found.");
    }
  }
};