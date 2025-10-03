'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_2 = new __compactRuntime.CompactTypeField();

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _tuple_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_2.fromValue(value_0),
      _descriptor_2.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_2.toValue(value_0[1]).concat(_descriptor_2.toValue(value_0[2]).concat(_descriptor_0.toValue(value_0[3]))));
  }
}

const _descriptor_4 = new _tuple_0();

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_5 = new _ZswapCoinPublicKey_0();

class _tuple_1 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2])));
  }
}

const _descriptor_6 = new _tuple_1();

class _tuple_2 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_1.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_1.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2])));
  }
}

const _descriptor_7 = new _tuple_2();

const _descriptor_8 = new __compactRuntime.CompactTypeBoolean();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_9 = new _ContractAddress_0();

const _descriptor_10 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_12 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.getLocalSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getLocalSecret');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      createPoll: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`createPoll: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('createPoll',
                                      'argument 1 (as invoked from Typescript)',
                                      'zkVote.compact line 69 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createPoll_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      createQuestion: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`createQuestion: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const pollIdHash_0 = args_1[1];
        const question_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('createQuestion',
                                      'argument 1 (as invoked from Typescript)',
                                      'zkVote.compact line 88 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(pollIdHash_0) === 'bigint' && pollIdHash_0 >= 0 && pollIdHash_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('createQuestion',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'zkVote.compact line 88 char 1',
                                      'Field',
                                      pollIdHash_0)
        }
        if (!(typeof(question_0) === 'bigint' && question_0 >= 0 && question_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('createQuestion',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'zkVote.compact line 88 char 1',
                                      'Field',
                                      question_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(pollIdHash_0).concat(_descriptor_2.toValue(question_0)),
            alignment: _descriptor_2.alignment().concat(_descriptor_2.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createQuestion_0(context,
                                                partialProofData,
                                                pollIdHash_0,
                                                question_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      generateHashKey(context, ...args_1) {
        return { result: pureCircuits.generateHashKey(...args_1), context };
      },
      generatePollIdHashKey(context, ...args_1) {
        return { result: pureCircuits.generatePollIdHashKey(...args_1), context };
      },
      generateQuestionIdHashKey(context, ...args_1) {
        return { result: pureCircuits.generateQuestionIdHashKey(...args_1), context };
      }
    };
    this.impureCircuits = {
      createPoll: this.circuits.createPoll,
      createQuestion: this.circuits.createQuestion
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = stateValue_0;
    state_0.setOperation('createPoll', new __compactRuntime.ContractOperation());
    state_0.setOperation('createQuestion', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(1n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(2n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(3n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(4n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(5n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(6n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(7n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(8n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_6, value_0);
    return result_0;
  }
  _transientHash_1(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_7, value_0);
    return result_0;
  }
  _transientHash_2(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_4, value_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_5.toValue(result_0),
      alignment: _descriptor_5.alignment()
    });
    return result_0;
  }
  _getLocalSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getLocalSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.type_error('getLocalSecret',
                                  'return value',
                                  'zkVote.compact line 59 char 1',
                                  'Bytes<32>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _createPoll_0(context, partialProofData) {
    const tag_0 = new Uint8Array([110, 101, 119, 32, 112, 111, 108, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const creatorKey_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(!this._equal_0(creatorKey_0,
                                           { bytes: new Uint8Array(32) }),
                            'Creator cannot be empty');
    const creatorHashKey_0 = this._generateHashKey_0(tag_0,
                                                     creatorKey_0.bytes,
                                                     this._getLocalSecret_0(context,
                                                                            partialProofData));
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_3.toValue(tmp_0),
                                              alignment: _descriptor_3.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 1 } }]);
    const pollIdHash_0 = this._generatePollIdHashKey_0(tag_0,
                                                       _descriptor_1.fromValue(Contract._query(context,
                                                                                               partialProofData,
                                                                                               [
                                                                                                { dup: { n: 0 } },
                                                                                                { idx: { cached: false,
                                                                                                         pushPath: false,
                                                                                                         path: [
                                                                                                                { tag: 'value',
                                                                                                                  value: { value: _descriptor_11.toValue(0n),
                                                                                                                           alignment: _descriptor_11.alignment() } }] } },
                                                                                                { popeq: { cached: true,
                                                                                                           result: undefined } }]).value),
                                                       this._getLocalSecret_0(context,
                                                                              partialProofData));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(pollIdHash_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(creatorHashKey_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _createQuestion_0(context, partialProofData, pollIdHash_0, question_0) {
    const tag_0 = new Uint8Array([110, 101, 119, 32, 113, 117, 101, 115, 116, 105, 111, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const creatorKey_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(!this._equal_1(creatorKey_0,
                                           { bytes: new Uint8Array(32) }),
                            'Creator cannot be empty');
    __compactRuntime.assert(question_0 !== 0n, 'Question cannot be empty');
    const questionIdHash_0 = this._generateQuestionIdHashKey_0(tag_0,
                                                               question_0,
                                                               pollIdHash_0,
                                                               this._getLocalSecret_0(context,
                                                                                      partialProofData));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(2n),
                                                alignment: _descriptor_11.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_2.toValue(pollIdHash_0),
                                                alignment: _descriptor_2.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(questionIdHash_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(question_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _generateHashKey_0(tag_0, pK1_0, pK2_0) {
    return this._transientHash_0([tag_0, pK1_0, pK2_0]);
  }
  _generatePollIdHashKey_0(tag_0, pollId_0, pK1_0) {
    return this._transientHash_1([tag_0, pollId_0, pK1_0]);
  }
  _generateQuestionIdHashKey_0(tag_0, question_0, pollIdHash_0, pK1_0) {
    return this._transientHash_2([tag_0, question_0, pollIdHash_0, pK1_0]);
  }
  _equal_0(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_1(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get pollId() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                 alignment: _descriptor_11.alignment() } }] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }]).value);
    },
    pollOwners: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(1n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(1n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkVote.compact line 13 char 1',
                                      'Field',
                                      key_0)
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(1n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'zkVote.compact line 13 char 1',
                                      'Field',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(1n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_2.toValue(key_0),
                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    questions: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(2n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(2n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkVote.compact line 16 char 1',
                                      'Field',
                                      key_0)
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(2n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'zkVote.compact line 16 char 1',
                                      'Field',
                                      key_0)
        }
        if (state.asArray()[2].asMap().get({ value: _descriptor_2.toValue(key_0),
                                             alignment: _descriptor_2.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(2n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_0),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(2n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_0),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0 && key_1 <= __compactRuntime.MAX_FIELD)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'zkVote.compact line 16 char 38',
                                          'Field',
                                          key_1)
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(2n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_0),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_1),
                                                                                                                   alignment: _descriptor_2.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0 && key_1 <= __compactRuntime.MAX_FIELD)) {
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'zkVote.compact line 16 char 38',
                                          'Field',
                                          key_1)
            }
            return _descriptor_2.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(2n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_0),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_1),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            { popeq: { cached: false,
                                                                       result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[2].asMap().get({ value: _descriptor_2.toValue(key_0),
                                                            alignment: _descriptor_2.alignment() });
            return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
          }
        }
      }
    },
    options: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(3n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(3n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkVote.compact line 19 char 1',
                                      'Field',
                                      key_0)
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(3n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'zkVote.compact line 19 char 1',
                                      'Field',
                                      key_0)
        }
        if (state.asArray()[3].asMap().get({ value: _descriptor_2.toValue(key_0),
                                             alignment: _descriptor_2.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(3n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_0),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(3n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_0),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0 && key_1 <= __compactRuntime.MAX_FIELD)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'zkVote.compact line 19 char 38',
                                          'Field',
                                          key_1)
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(3n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_0),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_1),
                                                                                                                   alignment: _descriptor_2.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0 && key_1 <= __compactRuntime.MAX_FIELD)) {
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'zkVote.compact line 19 char 38',
                                          'Field',
                                          key_1)
            }
            if (state.asArray()[3].asMap().get({ value: _descriptor_2.toValue(key_0),
                                                 alignment: _descriptor_2.alignment() }).asMap().get({ value: _descriptor_2.toValue(key_1),
                                                                                                       alignment: _descriptor_2.alignment() }) === undefined) {
              throw new __compactRuntime.CompactError(`Map value undefined for ${key_1}`);
            }
            return {
              isEmpty(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(3n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_0),
                                                                                           alignment: _descriptor_2.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_1),
                                                                                           alignment: _descriptor_2.alignment() } }] } },
                                                                'size',
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                       alignment: _descriptor_1.alignment() }).encode() } },
                                                                'eq',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              size(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_1.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(3n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_0),
                                                                                           alignment: _descriptor_2.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_1),
                                                                                           alignment: _descriptor_2.alignment() } }] } },
                                                                'size',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              member(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0 && key_2 <= __compactRuntime.MAX_FIELD)) {
                  __compactRuntime.type_error('member',
                                              'argument 1',
                                              'zkVote.compact line 19 char 49',
                                              'Field',
                                              key_2)
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(3n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_0),
                                                                                           alignment: _descriptor_2.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_1),
                                                                                           alignment: _descriptor_2.alignment() } }] } },
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_2),
                                                                                                                       alignment: _descriptor_2.alignment() }).encode() } },
                                                                'member',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              lookup(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0 && key_2 <= __compactRuntime.MAX_FIELD)) {
                  __compactRuntime.type_error('lookup',
                                              'argument 1',
                                              'zkVote.compact line 19 char 49',
                                              'Field',
                                              key_2)
                }
                return _descriptor_2.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(3n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_0),
                                                                                           alignment: _descriptor_2.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_1),
                                                                                           alignment: _descriptor_2.alignment() } }] } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_2),
                                                                                           alignment: _descriptor_2.alignment() } }] } },
                                                                { popeq: { cached: false,
                                                                           result: undefined } }]).value);
              },
              [Symbol.iterator](...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_2.length}`);
                }
                const self_0 = state.asArray()[3].asMap().get({ value: _descriptor_2.toValue(key_0),
                                                                alignment: _descriptor_2.alignment() }).asMap().get({ value: _descriptor_2.toValue(key_1),
                                                                                                                      alignment: _descriptor_2.alignment() });
                return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
              }
            }
          }
        }
      }
    },
    optionCounts: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(4n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(4n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkVote.compact line 27 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(4n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'zkVote.compact line 27 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        if (state.asArray()[4].asMap().get({ value: _descriptor_1.toValue(key_0),
                                             alignment: _descriptor_1.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(4n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(4n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'zkVote.compact line 27 char 45',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(4n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_1),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'zkVote.compact line 27 char 45',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            if (state.asArray()[4].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                 alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_1),
                                                                                                       alignment: _descriptor_1.alignment() }) === undefined) {
              throw new __compactRuntime.CompactError(`Map value undefined for ${key_1}`);
            }
            return {
              isEmpty(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(4n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                'size',
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                       alignment: _descriptor_1.alignment() }).encode() } },
                                                                'eq',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              size(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_1.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(4n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                'size',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              member(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0n && key_2 <= 18446744073709551615n)) {
                  __compactRuntime.type_error('member',
                                              'argument 1',
                                              'zkVote.compact line 27 char 59',
                                              'Uint<0..18446744073709551615>',
                                              key_2)
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(4n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_2),
                                                                                                                       alignment: _descriptor_1.alignment() }).encode() } },
                                                                'member',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              lookup(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0n && key_2 <= 18446744073709551615n)) {
                  __compactRuntime.type_error('lookup',
                                              'argument 1',
                                              'zkVote.compact line 27 char 59',
                                              'Uint<0..18446744073709551615>',
                                              key_2)
                }
                if (state.asArray()[4].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                     alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_1),
                                                                                                           alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_2),
                                                                                                                                                                 alignment: _descriptor_1.alignment() }) === undefined) {
                  throw new __compactRuntime.CompactError(`Map value undefined for ${key_2}`);
                }
                return {
                  read(...args_3) {
                    if (args_3.length !== 0) {
                      throw new __compactRuntime.CompactError(`read: expected 0 arguments, received ${args_3.length}`);
                    }
                    return _descriptor_1.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_11.toValue(4n),
                                                                                               alignment: _descriptor_11.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_1.toValue(key_0),
                                                                                               alignment: _descriptor_1.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_1.toValue(key_1),
                                                                                               alignment: _descriptor_1.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_1.toValue(key_2),
                                                                                               alignment: _descriptor_1.alignment() } }] } },
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value);
                  }
                }
              }
            }
          }
        }
      }
    },
    questionTotals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(5n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(5n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkVote.compact line 30 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(5n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'zkVote.compact line 30 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        if (state.asArray()[5].asMap().get({ value: _descriptor_1.toValue(key_0),
                                             alignment: _descriptor_1.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(5n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(5n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'zkVote.compact line 30 char 45',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(5n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_1),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'zkVote.compact line 30 char 45',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            if (state.asArray()[5].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                 alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_1),
                                                                                                       alignment: _descriptor_1.alignment() }) === undefined) {
              throw new __compactRuntime.CompactError(`Map value undefined for ${key_1}`);
            }
            return {
              read(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`read: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_1.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(5n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              }
            }
          }
        }
      }
    },
    userVoteCounts: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(6n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(6n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkVote.compact line 39 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(6n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'zkVote.compact line 39 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        if (state.asArray()[6].asMap().get({ value: _descriptor_1.toValue(key_0),
                                             alignment: _descriptor_1.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(6n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(6n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'zkVote.compact line 39 char 45',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(6n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_1),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'zkVote.compact line 39 char 45',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            if (state.asArray()[6].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                 alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_1),
                                                                                                       alignment: _descriptor_1.alignment() }) === undefined) {
              throw new __compactRuntime.CompactError(`Map value undefined for ${key_1}`);
            }
            return {
              isEmpty(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(6n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                'size',
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                       alignment: _descriptor_1.alignment() }).encode() } },
                                                                'eq',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              size(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_1.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(6n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                'size',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              member(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0 && key_2 <= __compactRuntime.MAX_FIELD)) {
                  __compactRuntime.type_error('member',
                                              'argument 1',
                                              'zkVote.compact line 39 char 59',
                                              'Field',
                                              key_2)
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(6n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_2),
                                                                                                                       alignment: _descriptor_2.alignment() }).encode() } },
                                                                'member',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              lookup(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0 && key_2 <= __compactRuntime.MAX_FIELD)) {
                  __compactRuntime.type_error('lookup',
                                              'argument 1',
                                              'zkVote.compact line 39 char 59',
                                              'Field',
                                              key_2)
                }
                return _descriptor_10.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 0 } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_11.toValue(6n),
                                                                                            alignment: _descriptor_11.alignment() } },
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_1.toValue(key_0),
                                                                                            alignment: _descriptor_1.alignment() } },
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_1.toValue(key_1),
                                                                                            alignment: _descriptor_1.alignment() } }] } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_2.toValue(key_2),
                                                                                            alignment: _descriptor_2.alignment() } }] } },
                                                                 { popeq: { cached: false,
                                                                            result: undefined } }]).value);
              },
              [Symbol.iterator](...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_2.length}`);
                }
                const self_0 = state.asArray()[6].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                                alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_1),
                                                                                                                      alignment: _descriptor_1.alignment() });
                return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_10.fromValue(value.value)    ];  })[Symbol.iterator]();
              }
            }
          }
        }
      }
    },
    voteReceipts: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(7n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(7n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkVote.compact line 47 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(7n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'zkVote.compact line 47 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        if (state.asArray()[7].asMap().get({ value: _descriptor_1.toValue(key_0),
                                             alignment: _descriptor_1.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(7n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(7n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'zkVote.compact line 47 char 43',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(7n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_1),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'zkVote.compact line 47 char 43',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            if (state.asArray()[7].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                 alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_1),
                                                                                                       alignment: _descriptor_1.alignment() }) === undefined) {
              throw new __compactRuntime.CompactError(`Map value undefined for ${key_1}`);
            }
            return {
              isEmpty(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(7n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                'size',
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                       alignment: _descriptor_1.alignment() }).encode() } },
                                                                'eq',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              size(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_1.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(7n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                'size',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              member(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0 && key_2 <= __compactRuntime.MAX_FIELD)) {
                  __compactRuntime.type_error('member',
                                              'argument 1',
                                              'zkVote.compact line 47 char 57',
                                              'Field',
                                              key_2)
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(7n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_2),
                                                                                                                       alignment: _descriptor_2.alignment() }).encode() } },
                                                                'member',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              lookup(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0 && key_2 <= __compactRuntime.MAX_FIELD)) {
                  __compactRuntime.type_error('lookup',
                                              'argument 1',
                                              'zkVote.compact line 47 char 57',
                                              'Field',
                                              key_2)
                }
                return _descriptor_2.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(7n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_2),
                                                                                           alignment: _descriptor_2.alignment() } }] } },
                                                                { popeq: { cached: false,
                                                                           result: undefined } }]).value);
              },
              [Symbol.iterator](...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_2.length}`);
                }
                const self_0 = state.asArray()[7].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                                alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_1),
                                                                                                                      alignment: _descriptor_1.alignment() });
                return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
              }
            }
          }
        }
      }
    },
    rewardClaims: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(8n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(8n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkVote.compact line 52 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(8n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'zkVote.compact line 52 char 1',
                                      'Uint<0..18446744073709551615>',
                                      key_0)
        }
        if (state.asArray()[8].asMap().get({ value: _descriptor_1.toValue(key_0),
                                             alignment: _descriptor_1.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(8n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(8n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'zkVote.compact line 52 char 43',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_11.toValue(8n),
                                                                                       alignment: _descriptor_11.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_1),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 18446744073709551615n)) {
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'zkVote.compact line 52 char 43',
                                          'Uint<0..18446744073709551615>',
                                          key_1)
            }
            if (state.asArray()[8].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                 alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_1),
                                                                                                       alignment: _descriptor_1.alignment() }) === undefined) {
              throw new __compactRuntime.CompactError(`Map value undefined for ${key_1}`);
            }
            return {
              isEmpty(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(8n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                'size',
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                       alignment: _descriptor_1.alignment() }).encode() } },
                                                                'eq',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              size(...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_2.length}`);
                }
                return _descriptor_1.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(8n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                'size',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              member(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0 && key_2 <= __compactRuntime.MAX_FIELD)) {
                  __compactRuntime.type_error('member',
                                              'argument 1',
                                              'zkVote.compact line 52 char 57',
                                              'Field',
                                              key_2)
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(8n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                { push: { storage: false,
                                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_2),
                                                                                                                       alignment: _descriptor_2.alignment() }).encode() } },
                                                                'member',
                                                                { popeq: { cached: true,
                                                                           result: undefined } }]).value);
              },
              lookup(...args_2) {
                if (args_2.length !== 1) {
                  throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_2.length}`);
                }
                const key_2 = args_2[0];
                if (!(typeof(key_2) === 'bigint' && key_2 >= 0 && key_2 <= __compactRuntime.MAX_FIELD)) {
                  __compactRuntime.type_error('lookup',
                                              'argument 1',
                                              'zkVote.compact line 52 char 57',
                                              'Field',
                                              key_2)
                }
                return _descriptor_8.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(8n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_0),
                                                                                           alignment: _descriptor_1.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_1.toValue(key_1),
                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_2.toValue(key_2),
                                                                                           alignment: _descriptor_2.alignment() } }] } },
                                                                { popeq: { cached: false,
                                                                           result: undefined } }]).value);
              },
              [Symbol.iterator](...args_2) {
                if (args_2.length !== 0) {
                  throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_2.length}`);
                }
                const self_0 = state.asArray()[8].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                                alignment: _descriptor_1.alignment() }).asMap().get({ value: _descriptor_1.toValue(key_1),
                                                                                                                      alignment: _descriptor_1.alignment() });
                return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_8.fromValue(value.value)    ];  })[Symbol.iterator]();
              }
            }
          }
        }
      }
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ getLocalSecret: (...args) => undefined });
const pureCircuits = {
  generateHashKey: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`generateHashKey: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const tag_0 = args_0[0];
    const pK1_0 = args_0[1];
    const pK2_0 = args_0[2];
    if (!(tag_0.buffer instanceof ArrayBuffer && tag_0.BYTES_PER_ELEMENT === 1 && tag_0.length === 32)) {
      __compactRuntime.type_error('generateHashKey',
                                  'argument 1',
                                  'zkVote.compact line 110 char 1',
                                  'Bytes<32>',
                                  tag_0)
    }
    if (!(pK1_0.buffer instanceof ArrayBuffer && pK1_0.BYTES_PER_ELEMENT === 1 && pK1_0.length === 32)) {
      __compactRuntime.type_error('generateHashKey',
                                  'argument 2',
                                  'zkVote.compact line 110 char 1',
                                  'Bytes<32>',
                                  pK1_0)
    }
    if (!(pK2_0.buffer instanceof ArrayBuffer && pK2_0.BYTES_PER_ELEMENT === 1 && pK2_0.length === 32)) {
      __compactRuntime.type_error('generateHashKey',
                                  'argument 3',
                                  'zkVote.compact line 110 char 1',
                                  'Bytes<32>',
                                  pK2_0)
    }
    return _dummyContract._generateHashKey_0(tag_0, pK1_0, pK2_0);
  },
  generatePollIdHashKey: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`generatePollIdHashKey: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const tag_0 = args_0[0];
    const pollId_0 = args_0[1];
    const pK1_0 = args_0[2];
    if (!(tag_0.buffer instanceof ArrayBuffer && tag_0.BYTES_PER_ELEMENT === 1 && tag_0.length === 32)) {
      __compactRuntime.type_error('generatePollIdHashKey',
                                  'argument 1',
                                  'zkVote.compact line 114 char 1',
                                  'Bytes<32>',
                                  tag_0)
    }
    if (!(typeof(pollId_0) === 'bigint' && pollId_0 >= 0n && pollId_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('generatePollIdHashKey',
                                  'argument 2',
                                  'zkVote.compact line 114 char 1',
                                  'Uint<0..18446744073709551615>',
                                  pollId_0)
    }
    if (!(pK1_0.buffer instanceof ArrayBuffer && pK1_0.BYTES_PER_ELEMENT === 1 && pK1_0.length === 32)) {
      __compactRuntime.type_error('generatePollIdHashKey',
                                  'argument 3',
                                  'zkVote.compact line 114 char 1',
                                  'Bytes<32>',
                                  pK1_0)
    }
    return _dummyContract._generatePollIdHashKey_0(tag_0, pollId_0, pK1_0);
  },
  generateQuestionIdHashKey: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`generateQuestionIdHashKey: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const tag_0 = args_0[0];
    const question_0 = args_0[1];
    const pollIdHash_0 = args_0[2];
    const pK1_0 = args_0[3];
    if (!(tag_0.buffer instanceof ArrayBuffer && tag_0.BYTES_PER_ELEMENT === 1 && tag_0.length === 32)) {
      __compactRuntime.type_error('generateQuestionIdHashKey',
                                  'argument 1',
                                  'zkVote.compact line 118 char 1',
                                  'Bytes<32>',
                                  tag_0)
    }
    if (!(typeof(question_0) === 'bigint' && question_0 >= 0 && question_0 <= __compactRuntime.MAX_FIELD)) {
      __compactRuntime.type_error('generateQuestionIdHashKey',
                                  'argument 2',
                                  'zkVote.compact line 118 char 1',
                                  'Field',
                                  question_0)
    }
    if (!(typeof(pollIdHash_0) === 'bigint' && pollIdHash_0 >= 0 && pollIdHash_0 <= __compactRuntime.MAX_FIELD)) {
      __compactRuntime.type_error('generateQuestionIdHashKey',
                                  'argument 3',
                                  'zkVote.compact line 118 char 1',
                                  'Field',
                                  pollIdHash_0)
    }
    if (!(pK1_0.buffer instanceof ArrayBuffer && pK1_0.BYTES_PER_ELEMENT === 1 && pK1_0.length === 32)) {
      __compactRuntime.type_error('generateQuestionIdHashKey',
                                  'argument 4',
                                  'zkVote.compact line 118 char 1',
                                  'Bytes<32>',
                                  pK1_0)
    }
    return _dummyContract._generateQuestionIdHashKey_0(tag_0,
                                                       question_0,
                                                       pollIdHash_0,
                                                       pK1_0);
  }
};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
