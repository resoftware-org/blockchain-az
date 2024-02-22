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
import { Transaction } from "../../src/abstract/Transaction";
import { Reader } from "../../src/buffer/Reader";

// mock a concrete implementation of a Transaction
class MockTransaction extends Transaction {
  public setBuffer(b: Uint8Array) {
    this.buffer = b;
  }
  public hasBuffer() {
    return this.buffer !== undefined;
  }

  // mocked abstract implementations
  public clone(): Transaction {
    return this;
  }
  public getHash(): Uint8Array {
    return new Uint8Array([]);
  }
  public toBuffer(): Uint8Array {
    return new Uint8Array([]);
  }
  public fromBuffer(reader: Uint8Array | Reader): Transaction {
    if (reader) return new MockTransaction(new Uint8Array());
    return new MockTransaction(new Uint8Array());
  }
}

describe("Transaction", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("constructor()", () => {
    it("should accept binary data input", () => {
      const tx_0 = new MockTransaction(new Uint8Array());

      expect(tx_0.hasBuffer()).to.be.equal(true);
    });
  });

  describe("getBuffer()", () => {
    let tx_0: MockTransaction, fakeToBuffer: sinon.SinonSpy;
    beforeEach(() => {
      tx_0 = new MockTransaction();

      fakeToBuffer = sinon.replace(
        tx_0,
        "toBuffer",
        sinon.fake(() => new Uint8Array()),
      );
    });

    it("should use buffer if available", () => {
      // prepare
      tx_0.setBuffer(new Uint8Array([]));

      // act
      tx_0.getBuffer();

      // assert
      expect(fakeToBuffer.callCount).to.be.equal(0);
    });

    it("should use toBuffer() given empty buffer", () => {
      // act
      tx_0.getBuffer();

      // assert
      expect(fakeToBuffer.callCount).to.be.equal(1);
    });
  });
});
