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
import { Writer } from "../../src/buffer/Writer";

describe("Writer", () => {
  describe("constructor()", () => {
    it("should accept buffer input", () => {
      const writer = new Writer(Buffer.from("00", "hex"));
      expect(writer.buffer).to.not.be.undefined;
    });

    it("should accept optional offset input", () => {
      const writer_0 = new Writer(Buffer.from("00", "hex")),
        writer_1 = new Writer(Buffer.from("00", "hex"), 1);

      expect(writer_0.offset).to.not.be.undefined;
      expect(writer_1.offset).to.not.be.undefined;
      expect(writer_0.offset).to.be.equal(0);
      expect(writer_1.offset).to.be.equal(1);
    });

    it("should use correct buffer size", () => {
      const writer_0 = new Writer(Buffer.from("00010203", "hex")),
        writer_1 = new Writer(Buffer.from("000102", "hex"));

      expect(writer_0.size).to.be.equal(4);
      expect(writer_1.size).to.be.equal(3);
    });

    it("should populate data view correctly", () => {
      const writer_0 = new Writer(Buffer.from("00010203", "hex")),
        writer_1 = new Writer(Buffer.from("000102", "hex"));

      expect(writer_0.data.byteLength).to.be.equal(4);
      expect(writer_1.data.byteLength).to.be.equal(3);
    });
  });

  describe("writeUint8()", () => {
    let writer: Writer;
    beforeEach(() => {
      writer = new Writer(Buffer.from("0001", "hex"));
    });

    it("should increment writing offset correctly", () => {
      // act
      writer.writeUint8(1);
      writer.writeUint8(2);

      // assert
      expect(writer.offset).to.be.equal(2);
    });

    it("should write one (1) byte with every call", () => {
      // act
      writer.writeUint8(1);
      writer.writeUint8(2);

      // assert
      expect(writer.buffer.at(0)).to.not.be.undefined;
      expect(writer.buffer.at(1)).to.not.be.undefined;
      expect(writer.buffer.at(0)).to.be.equal(1);
      expect(writer.buffer.at(1)).to.be.equal(2);
    });

    it("should use current writing offset", () => {
      // prepare
      writer.offset = 1;

      // act
      writer.writeUint8(2);

      // assert
      expect(writer.offset).to.be.equal(2); // writes 1b
      expect(writer.buffer.at(1)).to.not.be.undefined;
      expect(writer.buffer.at(1)).to.be.equal(2);
    });
  });

  describe("writeUint16()", () => {
    let writer: Writer;
    beforeEach(() => {
      writer = new Writer(Buffer.from("00000001", "hex"));
    });

    it("should increment writing offset correctly", () => {
      // act
      writer.writeUint16(1);
      writer.writeUint16(2);

      // assert
      expect(writer.offset).to.be.equal(4);
    });

    it("should write two (2) bytes with every call", () => {
      // act
      writer.writeUint16(1);
      writer.writeUint16(2);

      // assert
      expect(writer.buffer.at(0)).to.not.be.undefined;
      expect(writer.buffer.at(2)).to.not.be.undefined;
      expect(writer.buffer.at(0)).to.be.equal(1);
      expect(writer.buffer.at(2)).to.be.equal(2);
    });

    it("should use current writing offset", () => {
      // prepare
      writer.offset = 1;

      // act
      writer.writeUint16(2);

      // assert
      expect(writer.offset).to.be.equal(3); // writes 2b
      expect(writer.buffer.at(1)).to.not.be.undefined;
      expect(writer.buffer.at(1)).to.be.equal(2);
    });
  });

  describe("writeUint32()", () => {
    let writer: Writer;
    beforeEach(() => {
      writer = new Writer(Buffer.from("0000000000000001", "hex"));
    });

    it("should increment writing offset correctly", () => {
      // act
      writer.writeUint32(1);
      writer.writeUint32(2);

      // assert
      expect(writer.offset).to.be.equal(8);
    });

    it("should write four (4) bytes with every call", () => {
      // act
      writer.writeUint32(1);
      writer.writeUint32(2);

      // assert
      expect(writer.buffer.at(0)).to.not.be.undefined;
      expect(writer.buffer.at(4)).to.not.be.undefined;
      expect(writer.buffer.at(0)).to.be.equal(1);
      expect(writer.buffer.at(4)).to.be.equal(2);
    });

    it("should use current writing offset", () => {
      // prepare
      writer.offset = 1;

      // act
      writer.writeUint32(2);

      // assert
      expect(writer.offset).to.be.equal(5); // writes 4b
      expect(writer.buffer.at(1)).to.not.be.undefined;
      expect(writer.buffer.at(1)).to.be.equal(2);
    });
  });

  describe("writeUint64()", () => {
    let writer: Writer;
    beforeEach(() => {
      writer = new Writer(
        Buffer.from("00000000000000000000000000000001", "hex"),
      );
    });

    it("should increment writing offset correctly", () => {
      // act
      writer.writeUint64(1n); // bigint literal
      writer.writeUint64(2n); // bigint literal

      // assert
      expect(writer.offset).to.be.equal(16);
    });

    it("should write eight (8) bytes with every call", () => {
      // act
      writer.writeUint64(1n); // bigint literal
      writer.writeUint64(2n); // bigint literal

      // assert
      expect(writer.buffer.at(0)).to.not.be.undefined;
      expect(writer.buffer.at(8)).to.not.be.undefined;
      expect(writer.buffer.at(0)).to.be.equal(1);
      expect(writer.buffer.at(8)).to.be.equal(2);
    });

    it("should use current writing offset", () => {
      // prepare
      writer.offset = 1;

      // act
      writer.writeUint64(2n); // bigint literal

      // assert
      expect(writer.offset).to.be.equal(9); // writes 8b
      expect(writer.buffer.at(1)).to.not.be.undefined;
      expect(writer.buffer.at(1)).to.be.equal(2);
    });
  });

  describe("writeBuffer()", () => {
    let writer: Writer;
    beforeEach(() => {
      writer = new Writer(
        Buffer.from("000102030405060708090A0B0C0D0E0F", "hex"),
      );
    });

    it("should write correct number of bytes", () => {
      // act
      writer.writeBuffer(new Uint8Array([1, 2])); // writes 2 bytes

      // assert
      expect(writer.offset).to.be.equal(2);
      expect(writer.buffer.at(0)).to.be.equal(1);
      expect(writer.buffer.at(1)).to.be.equal(2);
    });

    it("should write multiple bytes into buffer", () => {
      // act
      writer.writeBuffer(new Uint8Array([1, 2])); // writes 2 bytes
      writer.writeBuffer(new Uint8Array([1, 2, 3, 4])); // writes 4 bytes

      // assert
      expect(writer.offset).to.be.equal(6);
      expect(writer.buffer.subarray(0, 2).toString("hex")).to.be.equal("0102");
      expect(writer.buffer.subarray(2, 6).toString("hex")).to.be.equal(
        "01020304",
      );
    });

    it("should use current writing offset", () => {
      // prepare
      writer.offset = 6;

      // act
      writer.writeBuffer(new Uint8Array([1, 2])); // writes 2 bytes

      // assert
      expect(writer.offset).to.be.equal(8); // writes 2b
      expect(writer.buffer.subarray(6, 8).toString("hex")).to.be.equal("0102");
    });

    it("should accept optional buffer offset", () => {
      // act
      writer.writeBuffer(new Uint8Array([1, 2, 3, 4]), 2); // writes 2b (offset 2)

      // assert
      expect(writer.offset).to.be.equal(2); // writes 2b
      expect(writer.buffer.subarray(0, 2).toString("hex")).to.be.equal("0304");
    });
  });
});
