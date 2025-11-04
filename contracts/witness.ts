import {
  Ledger,
  Contract as ContractType,
  Witnesses,
} from './managed/zkVoteV1/contract/index.cjs'
import { WitnessContext } from '@midnight-ntwrk/compact-runtime'

export type Contract<T, W extends Witnesses<T> = Witnesses<T>> = ContractType<
  T,
  W
>

export type PollCode = {
  codes: string[]
}

export function createPollCode(): PollCode {
  return { codes: [] }
}

export const localPollCode = (pollCode: Uint8Array) => ({
  pollCode,
})

const enc = new TextEncoder()

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function randomBytes(len: number): Uint8Array {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('Secure RNG unavailable: crypto.getRandomValues not found')
  }
  const b = new Uint8Array(len)
  globalThis.crypto.getRandomValues(b)
  return b
}

// Map 8 random bytes to 8 base32 chars, then format as XXXX-XXXX
function genCode(): string {
  const bytes = randomBytes(8)
  let s = ''
  for (let i = 0; i < 8; i++) s += alphabet[bytes[i] & 31]
  return s.slice(0, 4) + '-' + s.slice(4)
}


export const witnesses = {
  createPollCode: ({
    privateState,
  }: WitnessContext<any, PollCode>): [PollCode, Uint8Array] => {
    const state = privateState ?? createPollCode()
    const code = genCode()
    const next: PollCode = { codes: [...state.codes, code] }
    return [next, enc.encode(code)]
  },
}
