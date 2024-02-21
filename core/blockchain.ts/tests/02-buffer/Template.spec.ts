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
import { Template } from "../../src/buffer/Template";

describe("Template", () => {
  describe("constructor()", () => {
    it("should accept optional fields array", () => {
      const tpl_0 = new Template(),
        tpl_1 = new Template([{ type: "uint8", data: new Uint8Array([1]) }]);

      expect(tpl_0.fields).to.not.be.undefined;
      expect(tpl_1.fields).to.not.be.undefined;
      expect(tpl_0.fields).to.be.empty;
      expect(tpl_1.fields).to.not.be.empty;
    });

    it("should compute correct byte length", () => {
      const tpl_1 = new Template([
        { type: "uint8", data: new Uint8Array([1]) },
        { type: "uint16", data: new Uint8Array([1, 2]) },
        { type: "uint32", data: new Uint8Array([1, 2, 3, 4]) },
      ]);

      expect(tpl_1.fields).to.not.be.undefined;
      expect(tpl_1.fields).to.not.be.empty;
      expect(tpl_1.byteLength).to.be.equal(1 + 2 + 4);
    });
  });

  describe("toBuffer()", () => {
    let tpl: Template;
    beforeEach(() => {
      tpl = new Template([
        { type: "uint8", data: new Uint8Array([1]) },
        { type: "uint16", data: new Uint8Array([3, 2]) }, // as little endian => 0203
        { type: "uint32", data: new Uint8Array([7, 6, 5, 4]) }, // as little endian => 04050607
        {
          type: "buffer",
          data: new Uint8Array([8, 9, 10, 11, 12, 13, 14, 15]),
        }, // endianness from buffer!
      ]);
    });

    it("should create a buffer with correctly aligned fields", () => {
      // act
      const buffer: Uint8Array = tpl.toBuffer();

      // assert
      expect(buffer.byteLength).to.be.equal(1 + 2 + 4 + 8);
      expect(Buffer.from(buffer).toString("hex").toUpperCase()).to.be.equal(
        "0102030405060708090A0B0C0D0E0F",
      );
    });

    it("should correctly extract uint8 from DataView", () => {
      // prepare
      const tpl_2 = new Template([
        { type: "uint8", data: new Uint8Array([2]) }, // 02
        { type: "uint8", data: new Uint8Array([3]) }, // 03
        { type: "uint8", data: new Uint8Array([55]) }, // 37
      ]);

      // act
      const buffer: Uint8Array = tpl_2.toBuffer();

      // assert
      expect(buffer.byteLength).to.be.equal(1 + 1 + 1);
      expect(Buffer.from(buffer).toString("hex").toUpperCase()).to.be.equal(
        "020337",
      );
    });

    it("should correctly extract uint16 from DataView", () => {
      // prepare
      const tpl_2 = new Template([
        { type: "uint16", data: new Uint8Array([1, 1]) }, // 0101
        { type: "uint16", data: new Uint8Array([2, 2]) }, // 0202
        { type: "uint16", data: new Uint8Array([3, 3]) }, // 0303
        { type: "uint16", data: new Uint8Array([4, 3]) }, // 0304
        { type: "uint16", data: new Uint8Array([1, 255]) }, // FF01
      ]);

      // act
      const buffer: Uint8Array = tpl_2.toBuffer();

      // assert
      expect(buffer.byteLength).to.be.equal(2 + 2 + 2 + 2 + 2);
      expect(Buffer.from(buffer).toString("hex").toUpperCase()).to.be.equal(
        "0101020203030304FF01",
      );
    });

    it("should correctly extract uint32 from DataView", () => {
      // prepare
      const tpl_2 = new Template([
        {
          type: "uint32",
          data: Uint8Array.from(Buffer.from("FFFFFFFF", "hex")),
        }, // 4 294 967 295
      ]);

      // act
      const buffer: Uint8Array = tpl_2.toBuffer();

      // assert
      expect(buffer.byteLength).to.be.equal(4); // 4 bytes
      expect(buffer.at(0)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(1)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(2)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(3)).to.be.equal(255); // "FF" for each byte
      expect(Buffer.from(buffer).toString("hex").toUpperCase()).to.be.equal(
        "FFFFFFFF",
      );
    });

    it("should correctly extract uint64 from DataView", () => {
      // prepare
      const tpl_2 = new Template([
        {
          type: "uint64",
          data: Uint8Array.from(Buffer.from("FFFFFFFFFFFFFFFF", "hex")),
        }, // 18 446 744 073 709 551 615
      ]);

      // act
      const buffer: Uint8Array = tpl_2.toBuffer();
      const asBigInt: BigInt = buffer.reduce(
        (p, c) => BigInt(p) * 256n + BigInt(c),
        0n,
      );

      // assert
      expect(buffer.byteLength).to.be.equal(8); // 8 bytes
      expect(buffer.at(0)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(1)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(2)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(3)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(4)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(5)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(6)).to.be.equal(255); // "FF" for each byte
      expect(buffer.at(7)).to.be.equal(255); // "FF" for each byte
      expect(Buffer.from(buffer).toString("hex").toUpperCase()).to.be.equal(
        "FFFFFFFFFFFFFFFF",
      );
      expect(asBigInt.toString(16).toUpperCase()).to.be.equal(
        "FFFFFFFFFFFFFFFF",
      );
      expect(asBigInt.toString()).to.be.equal("18446744073709551615");
    });

    it("should correctly extract buffer from field", () => {
      // prepare
      const buffer_hex =
        "000102030405060708090A0B0C0D0E0F" + "000102030405060708090A0B0C0D0E0F"; // 32 bytes

      const tpl_2 = new Template([
        {
          type: "buffer",
          data: Uint8Array.from(Buffer.from(buffer_hex, "hex")),
        },
      ]);

      // act
      const buffer: Uint8Array = tpl_2.toBuffer();

      // assert
      expect(buffer.byteLength).to.be.equal(32); // 32 bytes
      expect(Buffer.from(buffer).toString("hex").toUpperCase()).to.be.equal(
        buffer_hex,
      ); // endianness kept
    });
  });
});
