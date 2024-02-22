/**
 * This file is part of Blockchain A-Z by re:Software S.L. shared under LGPL-3.0
 * Copyright (C) 2024-present re:Software S.L. (www.resoftware.es),
 * All rights reserved.
 *
 * @package     Blockchain.ts
 * @subpackage  Tests
 * @author      re:Software S.L. <devs@resoftware.es>
 * @license     LGPL-3.0
 */
// external dependencies
import { expect } from "chai";

// internal dependencies
import { MerkleTree } from "../../src/struct/MerkleTree";

// this non-hash-function reduces the buffer size
// by half, knowing that the MerkleTree class
// concatenates pairs of hashes before using it.
// note that this non-hash-function won't work
// with hashes that are differently sized
const fakeHashFunction = (h: Uint8Array) => {
  const hash: Uint8Array = new Uint8Array(h.length / 2);
  for (let i = 0; i < h.length / 2; i++) {
    const j = i + h.length / 2;

    // the process here effectively reduces the buffer
    // by creating a sum of 2 bytes in the buffer and
    // keeps only the first of both indexes
    hash[i] = h[i] + h[j];
  }

  return hash;
};

describe("MerkleTree", () => {
  describe("constructor()", () => {
    it("should accept an even array of hashes", () => {
      // prepare
      const hash =
        "000102030405060708090A0B0C0D0E0F" + "000102030405060708090A0B0C0D0E0F"; // 32 bytes

      // act
      const tree = new MerkleTree(
        [
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash, "hex")),
        ],
        fakeHashFunction, // fake hash function
      );

      // assert
      expect(tree.hashes).to.not.be.undefined;
      expect(tree.hashes.length).to.be.equal(4);
    });

    it("should add a leaf for odd arrays of hashes", () => {
      // prepare
      const hash =
        "000102030405060708090A0B0C0D0E0F" + "000102030405060708090A0B0C0D0E0F"; // 32 bytes

      // act
      const tree = new MerkleTree(
        [
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash, "hex")),
        ],
        fakeHashFunction, // fake hash function
      );

      // assert
      expect(tree.hashes).to.not.be.undefined;
      expect(tree.hashes.length).to.be.equal(4);
    });

    it("should clone last leaf for odd arrays of hashes", () => {
      // prepare
      const hash =
        "000102030405060708090A0B0C0D0E0F" + "000102030405060708090A0B0C0D0E0F"; // 32 bytes
      const hash_test =
        "FF0102030405060708090A0B0C0D0E0F" + "000102030405060708090A0B0C0D0E0F"; // 32 bytes

      // act
      const tree = new MerkleTree(
        [
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash_test, "hex")),
        ],
        fakeHashFunction, // fake hash function
      );

      // assert
      expect(tree.hashes).to.not.be.undefined;
      expect(tree.hashes.length).to.be.equal(4);
      expect(
        Buffer.from(tree.hashes[3]).toString("hex").toUpperCase(),
      ).to.be.equal(hash_test);
    });

    it("should accept optional hashSize and use if empty", () => {
      // act
      const tree = new MerkleTree(
        [],
        fakeHashFunction, // fake hash function
        64, // 64 bytes
      );

      // assert
      expect(tree.merkleRoot.byteLength).to.be.equal(64);
    });

    it("should fill merkleRoot after creating instance", () => {
      // act
      const tree = new MerkleTree(
        [],
        fakeHashFunction, // fake hash function
        64, // 64 bytes
      );

      // assert
      expect(tree.merkleRoot).to.not.be.undefined;
    });
  });

  describe("getRoot()", () => {
    let tree: MerkleTree,
      hash =
        "000102030405060708090A0B0C0D0E0F" + "000102030405060708090A0B0C0D0E0F"; // 32 bytes
    beforeEach(() => {
      tree = new MerkleTree(
        [
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash, "hex")),
          Uint8Array.from(Buffer.from(hash, "hex")),
        ],
        fakeHashFunction,
      );
    });

    it("should use hash function to create a merkle root leaf", () => {
      // prepare
      const resultHash =
        "000306090C0F1215181B1E2124272A2D000306090C0F1215181B1E2124272A2D";

      // act
      const merkleRoot = tree.getRoot();

      // assert
      expect(Buffer.from(merkleRoot).toString("hex").toUpperCase()).to.be.equal(
        resultHash,
      );
    });

    it("should run one (1) round given two (2) hashes", () => {
      // prepare
      const inputHash1 =
        "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F";
      const inputHash2 =
        "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F";

      // result for one round is simply a sum done byte-by-byte
      // e.g. when running one round we have: 01 + 01 = 02
      const resultHash =
        "00020406080A0C0E10121416181A1C1E00020406080A0C0E10121416181A1C1E";

      // act
      const new_tree = new MerkleTree(
        [
          Uint8Array.from(Buffer.from(inputHash1, "hex")),
          Uint8Array.from(Buffer.from(inputHash2, "hex")),
        ],
        fakeHashFunction,
      );

      // assert
      expect(
        Buffer.from(new_tree.merkleRoot).toString("hex").toUpperCase(),
      ).to.be.equal(resultHash);
    });

    it("should run four (4) rounds given five (5) hashes", () => {
      // prepare
      const inputHash1 =
        "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F";
      const inputHash2 =
        "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F";
      const inputHash3 =
        "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F";
      const inputHash4 =
        "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F";
      const inputHash5 =
        "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F";

      // result for one round is simply a sum done byte-by-byte
      // e.g. when running four rounds we have: 01 + 01 + 01 + 01 + 01 = 05
      const resultHash =
        "00050A0F14191E23282D32373C41464B00050A0F14191E23282D32373C41464B";

      // act
      const new_tree = new MerkleTree(
        [
          Uint8Array.from(Buffer.from(inputHash1, "hex")),
          Uint8Array.from(Buffer.from(inputHash2, "hex")),
          Uint8Array.from(Buffer.from(inputHash3, "hex")),
          Uint8Array.from(Buffer.from(inputHash4, "hex")),
          Uint8Array.from(Buffer.from(inputHash5, "hex")),
        ],
        fakeHashFunction,
      );

      // assert
      expect(
        Buffer.from(new_tree.merkleRoot).toString("hex").toUpperCase(),
      ).to.be.equal(resultHash);
    });
  });
});
