/**
 * @file zkVoteV1.test.ts
 * Vitest suite for zkVoteV1 using ZkVoteV1Simulator.
 */

import { describe, it, expect } from "vitest";
import { ZkVoteV1Simulator } from "./zkVoteV1Simulator.js";
import { NetworkId, setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";

setNetworkId(NetworkId.Undeployed);

const td = new TextDecoder();
// results are raw Uint8Array
const bytesToStr = (u8: Uint8Array) => td.decode(u8).replace(/\x00+$/g, "");

describe("zkVoteV1 – happy path", () => {
  it("creates a poll from a human code; questionCount starts at 0", () => {
    const sim = new ZkVoteV1Simulator();
    const code = "ABCD-1234";
    sim.createPoll(code);

    const pollId = sim.pollIdFromCode(sim.bytes16(code));
    expect(sim.questionCount(pollId)).toBe(0n);
  });

  it("adds a question and reads it back", () => {
    const sim = new ZkVoteV1Simulator();
    const code = "ROOM-0002";
    sim.createPoll(code);
    const pollId = sim.pollIdFromCode(sim.bytes16(code));

    const qText = "What is your favorite color?";
    const qId = sim.questionIdHash(pollId, qText);
    sim.createQuestion(pollId, qText);

    expect(sim.questionCount(pollId)).toBe(1n);
    expect(bytesToStr(sim.questionRead(pollId, qId))).toBe(qText);
  });

  it("adds options and reads them back", () => {
    const sim = new ZkVoteV1Simulator();
    const code = "ROOM-OPTS";
    sim.createPoll(code);
    const pollId = sim.pollIdFromCode(sim.bytes16(code));

    const qText = "Choose a pet:";
    const qId = sim.questionIdHash(pollId, qText);
    sim.createQuestion(pollId, qText);

    const opts = ["Cat", "Dog", "Bird"];
    const optIds = opts.map((o) => {
      const id = sim.optionIdHash(qId, o);
      sim.createOption(pollId, qId, o);
      return { o, id };
    });

    for (const { o, id } of optIds) {
      expect(bytesToStr(sim.optionRead(pollId, qId, id))).toBe(o);
    }
  });

  it("submits a vote (smoke)", () => {
    const sim = new ZkVoteV1Simulator();
    const code = "ROOM-VOTE";
    sim.createPoll(code);
    const pollId = sim.pollIdFromCode(sim.bytes16(code));

    const qText = "Pick one:";
    const qId = sim.questionIdHash(pollId, qText);
    sim.createQuestion(pollId, qText);

    const oText = "Alpha";
    const oId = sim.optionIdHash(qId, oText);
    sim.createOption(pollId, qId, oText);

    expect(() => sim.submitVote(pollId, qId, oId)).not.toThrow();
  });
});

describe("zkVoteV1 – assertions", () => {
  it("createPoll rejects empty code (default<Bytes<16>>)", () => {
    const sim = new ZkVoteV1Simulator();
    const empty16 = new Uint8Array(16); // 👈 raw Uint8Array, not {bytes: ...}
    // low-level call to trigger assert
    // : direct low-level access to circuits
    expect(() => sim["contract"].impureCircuits.createPoll(sim as any, empty16)).toThrow();
  });

  it("createQuestion rejects empty inputs", () => {
    const sim = new ZkVoteV1Simulator();
    const code = "ROOM-VAL";
    sim.createPoll(code);
    const pollId = sim.pollIdFromCode(sim.bytes16(code));

    // empty pollIdHash
    // 
    expect(() => sim.createQuestion(undefined, "Hello")).toThrow();

    // empty question bytes
    const emptyQ = new Uint8Array(250);
    expect(() =>
      // : direct low-level call
      sim["contract"].impureCircuits.createQuestion(sim as any, pollId, emptyQ),
    ).toThrow();
  });

  it("createOption rejects empty inputs", () => {
    const sim = new ZkVoteV1Simulator();
    const code = "ROOM-VAL2";
    sim.createPoll(code);
    const pollId = sim.pollIdFromCode(sim.bytes16(code));

    const qText = "Q?";
    const qId = sim.questionIdHash(pollId, qText);
    sim.createQuestion(pollId, qText);

    // empty option bytes
    const emptyOpt = new Uint8Array(100);
    expect(() =>
      // : direct low-level call
      sim["contract"].impureCircuits.createOption(sim as any, pollId, qId, emptyOpt),
    ).toThrow();

    // empty questionIdHash
    // 
    expect(() => sim.createOption(pollId, undefined, "X")).toThrow();
  });

  it("reads assert on missing IDs", () => {
    const sim = new ZkVoteV1Simulator();
    const code = "ROOM-VAL3";
    sim.createPoll(code);
    const pollId = sim.pollIdFromCode(sim.bytes16(code));

    const qText = "Hello?";
    const qId = sim.questionIdHash(pollId, qText);
    sim.createQuestion(pollId, qText);

    const oText = "Yes";
    const oId = sim.optionIdHash(qId, oText);
    sim.createOption(pollId, qId, oText);

    // 
    expect(() => sim.questionRead(undefined, qId)).toThrow();
    // 
    expect(() => sim.optionRead(pollId, undefined, oId)).toThrow();
    // 
    expect(() => sim.optionRead(pollId, qId, undefined)).toThrow();
  });
});
