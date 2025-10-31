import { Ledger } from './managed/zkVoteV2/contract/index.cjs'
import { WitnessContext } from '@midnight-ntwrk/compact-runtime'

export type PollCode = {
  readonly pollCode: Uint8Array
}

export const localPollCode = (pollCode: Uint8Array) => ({
  pollCode,
})

export const witnesses = {
  getLocalPollCode: ({
    privateState,
  }: WitnessContext<Ledger, PollCode>): [PollCode, Uint8Array] => [
    privateState,
    privateState.pollCode,
  ],
}
