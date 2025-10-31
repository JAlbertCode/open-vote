import {
  Ledger,
  Contract as ContractType,
  Witnesses,
} from './managed/zkVoteV2/contract/index.cjs'
import { WitnessContext } from '@midnight-ntwrk/compact-runtime'

export type Contract<T, W extends Witnesses<T> = Witnesses<T>> = ContractType<
  T,
  W
>

export type PollCode = {}

export function createPollCode(): PollCode {
  return {}
}

export const localPollCode = (pollCode: Uint8Array) => ({
  pollCode,
})

export const witnesses = {
  createPollCode: ({
    privateState,
  }: WitnessContext<any, PollCode>): [PollCode, Uint8Array] => {
    // Generate 32 random bytes using Math.random()
    const randomBytes = new Uint8Array(32)
    for (let i = 0; i < 32; i++) {
      randomBytes[i] = Math.floor(Math.random() * 256)
    }
    return [privateState, randomBytes]
  },
}
