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
import sinon from "sinon";

// internal dependencies
import { Block } from "../../src/abstract/Block";
import { Reader } from "../../src/buffer/Reader";

// mock a concrete implementation of a Block
class MockBlock extends Block {
  public setBuffer(b: Uint8Array) {
    this.buffer = b;
  }
  public hasBuffer() {
    return this.buffer !== undefined;
  }

  // mocked abstract implementations
  public getHeader(): Uint8Array {
    return new Uint8Array([]);
  }
  public getHash(): Uint8Array {
    return new Uint8Array([]);
  }
  public toBuffer(): Uint8Array {
    return new Uint8Array([]);
  }
  public fromBuffer(reader: Uint8Array | Reader): Block {
    if (reader) return new MockBlock();
    return new MockBlock();
  }
}

describe("Block", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("constructor()", () => {
    it("should accept optional previous block", () => {
      const block_0 = new MockBlock();
      const block_1 = new MockBlock(block_0);

      expect(block_0.previous).to.be.undefined;
      expect(block_1.previous).to.not.be.undefined;
    });
  });

  describe("getBuffer()", () => {
    let block_0: MockBlock, fakeToBuffer: sinon.SinonSpy;
    beforeEach(() => {
      block_0 = new MockBlock();

      fakeToBuffer = sinon.replace(
        block_0,
        "toBuffer",
        sinon.fake(() => new Uint8Array()),
      );
    });

    it("should use buffer if available", () => {
      // prepare
      block_0.setBuffer(new Uint8Array([]));

      // act
      block_0.getBuffer();

      // assert
      expect(fakeToBuffer.callCount).to.be.equal(0);
    });

    it("should use toBuffer() given empty buffer", () => {
      // act
      block_0.getBuffer();

      // assert
      expect(fakeToBuffer.callCount).to.be.equal(1);
    });
  });
});
