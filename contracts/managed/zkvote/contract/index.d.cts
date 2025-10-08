import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  getLocalSecret(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
}

export type ImpureCircuits<T> = {
  createPoll(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  createQuestion(context: __compactRuntime.CircuitContext<T>,
                 pollIdHash_0: bigint,
                 question_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  createOption(context: __compactRuntime.CircuitContext<T>,
               pollIdHash_0: bigint,
               questionIdHash_0: bigint,
               option_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  questionCount(context: __compactRuntime.CircuitContext<T>,
                pollIdHash_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  questionRead(context: __compactRuntime.CircuitContext<T>,
               pollIdHash_0: bigint,
               questionIdHash_0: bigint): __compactRuntime.CircuitResults<T, Uint8Array>;
}

export type PureCircuits = {
  generateHashKey(tag_0: Uint8Array, pK1_0: Uint8Array, pK2_0: Uint8Array): bigint;
  generatePollIdHashKey(tag_0: Uint8Array, pollId_0: bigint, pK1_0: Uint8Array): bigint;
  generateQuestionIdHashKey(tag_0: Uint8Array,
                            question_0: Uint8Array,
                            pollIdHash_0: bigint,
                            pK1_0: Uint8Array): bigint;
  generateOptionIdHashKey(tag_0: Uint8Array,
                          option_0: Uint8Array,
                          questionIdHash_0: bigint,
                          pK1_0: Uint8Array): bigint;
}

export type Circuits<T> = {
  createPoll(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  createQuestion(context: __compactRuntime.CircuitContext<T>,
                 pollIdHash_0: bigint,
                 question_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  createOption(context: __compactRuntime.CircuitContext<T>,
               pollIdHash_0: bigint,
               questionIdHash_0: bigint,
               option_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  questionCount(context: __compactRuntime.CircuitContext<T>,
                pollIdHash_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  questionRead(context: __compactRuntime.CircuitContext<T>,
               pollIdHash_0: bigint,
               questionIdHash_0: bigint): __compactRuntime.CircuitResults<T, Uint8Array>;
  generateHashKey(context: __compactRuntime.CircuitContext<T>,
                  tag_0: Uint8Array,
                  pK1_0: Uint8Array,
                  pK2_0: Uint8Array): __compactRuntime.CircuitResults<T, bigint>;
  generatePollIdHashKey(context: __compactRuntime.CircuitContext<T>,
                        tag_0: Uint8Array,
                        pollId_0: bigint,
                        pK1_0: Uint8Array): __compactRuntime.CircuitResults<T, bigint>;
  generateQuestionIdHashKey(context: __compactRuntime.CircuitContext<T>,
                            tag_0: Uint8Array,
                            question_0: Uint8Array,
                            pollIdHash_0: bigint,
                            pK1_0: Uint8Array): __compactRuntime.CircuitResults<T, bigint>;
  generateOptionIdHashKey(context: __compactRuntime.CircuitContext<T>,
                          tag_0: Uint8Array,
                          option_0: Uint8Array,
                          questionIdHash_0: bigint,
                          pK1_0: Uint8Array): __compactRuntime.CircuitResults<T, bigint>;
}

export type Ledger = {
  readonly pollId: bigint;
  pollOwners: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
  questions: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): Uint8Array;
      [Symbol.iterator](): Iterator<[bigint, Uint8Array]>
    }
  };
  questionsInPoll: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): { read(): bigint }
  };
  options: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): {
        isEmpty(): boolean;
        size(): bigint;
        member(key_2: bigint): boolean;
        lookup(key_2: bigint): Uint8Array;
        [Symbol.iterator](): Iterator<[bigint, Uint8Array]>
      }
    }
  };
  optionsInQuestions: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): { read(): bigint }
  };
  optionVotesReceived: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): {
        isEmpty(): boolean;
        size(): bigint;
        member(key_2: bigint): boolean;
        lookup(key_2: bigint): { read(): bigint }
      }
    }
  };
  questionVotesRecieved: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): { read(): bigint }
    }
  };
  userVoteCounts: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): {
        isEmpty(): boolean;
        size(): bigint;
        member(key_2: bigint): boolean;
        lookup(key_2: bigint): bigint;
        [Symbol.iterator](): Iterator<[bigint, bigint]>
      }
    }
  };
  voteReceipts: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): {
        isEmpty(): boolean;
        size(): bigint;
        member(key_2: bigint): boolean;
        lookup(key_2: bigint): bigint;
        [Symbol.iterator](): Iterator<[bigint, bigint]>
      }
    }
  };
  rewardClaims: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): {
        isEmpty(): boolean;
        size(): bigint;
        member(key_2: bigint): boolean;
        lookup(key_2: bigint): boolean;
        [Symbol.iterator](): Iterator<[bigint, boolean]>
      }
    }
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
