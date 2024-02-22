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
import { Wallet } from "../../src/abstract/Wallet";

// mock a concrete implementation of a Wallet
class MockWallet extends Wallet {
  public getPrivateKey(): Uint8Array | undefined {
    return this.privateKey;
  }

  // mocked abstract implementations
  public toHash(): Uint8Array {
    return new Uint8Array([]);
  }
  public toAddress(): Uint8Array {
    return new Uint8Array([]);
  }
}

describe("Wallet", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("constructor()", () => {
    it("should accept public key input", () => {
      const wlt_0 = new MockWallet(new Uint8Array());

      expect(wlt_0.publicKey).to.not.be.undefined;
    });

    it("should accept optional private key input", () => {
      const wlt_0 = new MockWallet(new Uint8Array()),
        wlt_1 = new MockWallet(new Uint8Array(), new Uint8Array());

      expect(wlt_0.getPrivateKey()).to.be.undefined;
      expect(wlt_1.getPrivateKey()).to.not.be.undefined;
    });
  });

  describe("toHex()", () => {
    let wlt_0: MockWallet;
    beforeEach(() => {
      wlt_0 = new MockWallet(new Uint8Array([1, 2, 3, 4]));
    });

    it("should represent public key in hex format", () => {
      // act
      const hex = wlt_0.toHex();

      // assert
      expect(hex).to.be.equal("01020304");
    });
  });
});
