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
import { Reader } from "../../src/buffer/Reader";

describe("Reader", () => {
  describe("constructor()", () => {
    it("should accept buffer input", () => {
      const reader = new Reader(Buffer.from("00", "hex"));
      expect(reader.buffer).to.not.be.undefined;
    });

    it("should accept optional offset input", () => {
      const reader_0 = new Reader(Buffer.from("00", "hex")),
        reader_1 = new Reader(Buffer.from("00", "hex"), 1);

      expect(reader_0.offset).to.not.be.undefined;
      expect(reader_1.offset).to.not.be.undefined;
      expect(reader_0.offset).to.be.equal(0);
      expect(reader_1.offset).to.be.equal(1);
    });

    it("should use correct buffer size", () => {
      const reader_0 = new Reader(Buffer.from("00010203", "hex")),
        reader_1 = new Reader(Buffer.from("000102", "hex"));

      expect(reader_0.size).to.be.equal(4);
      expect(reader_1.size).to.be.equal(3);
    });

    it("should populate data view correctly", () => {
      const reader_0 = new Reader(Buffer.from("00010203", "hex")),
        reader_1 = new Reader(Buffer.from("000102", "hex"));

      expect(reader_0.data.byteLength).to.be.equal(4);
      expect(reader_1.data.byteLength).to.be.equal(3);
    });
  });

  describe("readUint8()", () => {
    let reader: Reader;
    beforeEach(() => {
      reader = new Reader(Buffer.from("0001", "hex"));
    });

    it("should increment reading offset correctly", () => {
      // act
      reader.readUint8();
      reader.readUint8();

      // assert
      expect(reader.offset).to.be.equal(2);
    });

    it("should read one (1) byte with every call", () => {
      // act
      const byte_0 = reader.readUint8();
      const byte_1 = reader.readUint8();

      // assert
      expect(byte_0).to.not.be.undefined;
      expect(byte_1).to.not.be.undefined;
      expect(byte_0).to.be.equal(0);
      expect(byte_1).to.be.equal(1);
    });

    it("should use current reading offset", () => {
      // prepare
      reader.offset = 1;

      // act
      const byte_1 = reader.readUint8();

      // assert
      expect(reader.offset).to.be.equal(2); // reads 1b
      expect(byte_1).to.not.be.undefined;
      expect(byte_1).to.be.equal(1);
    });
  });

  describe("readUint16()", () => {
    let reader: Reader;
    beforeEach(() => {
      reader = new Reader(Buffer.from("01000000", "hex"));
    });

    it("should increment reading offset correctly", () => {
      // act
      reader.readUint16();
      reader.readUint16();

      // assert
      expect(reader.offset).to.be.equal(4);
    });

    it("should read two (2) bytes with every call", () => {
      // act
      const byte_0 = reader.readUint16();
      const byte_1 = reader.readUint16();

      // assert
      expect(byte_0).to.not.be.undefined;
      expect(byte_1).to.not.be.undefined;
      expect(byte_0).to.be.equal(1);
      expect(byte_1).to.be.equal(0);
    });

    it("should use current reading offset", () => {
      // prepare
      reader.offset = 2;

      // act
      const byte_1 = reader.readUint16();

      // assert
      expect(reader.offset).to.be.equal(4); // reads 2b
      expect(byte_1).to.not.be.undefined;
      expect(byte_1).to.be.equal(0);
    });
  });

  describe("readUint32()", () => {
    let reader: Reader;
    beforeEach(() => {
      reader = new Reader(Buffer.from("0100000000000000", "hex"));
    });

    it("should increment reading offset correctly", () => {
      // act
      reader.readUint32();
      reader.readUint32();

      // assert
      expect(reader.offset).to.be.equal(8);
    });

    it("should read four (4) bytes with every call", () => {
      // act
      const byte_0 = reader.readUint32();
      const byte_1 = reader.readUint32();

      // assert
      expect(byte_0).to.not.be.undefined;
      expect(byte_1).to.not.be.undefined;
      expect(byte_0).to.be.equal(1);
      expect(byte_1).to.be.equal(0);
    });

    it("should use current reading offset", () => {
      // prepare
      reader.offset = 4;

      // act
      const byte_1 = reader.readUint32();

      // assert
      expect(reader.offset).to.be.equal(8); // reads 4b
      expect(byte_1).to.not.be.undefined;
      expect(byte_1).to.be.equal(0);
    });
  });

  describe("readUint64()", () => {
    let reader: Reader;
    beforeEach(() => {
      reader = new Reader(
        Buffer.from("01000000000000000000000000000000", "hex"),
      );
    });

    it("should increment reading offset correctly", () => {
      // act
      reader.readUint64();
      reader.readUint64();

      // assert
      expect(reader.offset).to.be.equal(16);
    });

    it("should read eight (8) bytes with every call", () => {
      // act
      const byte_0 = reader.readUint64();
      const byte_1 = reader.readUint64();

      // assert
      expect(byte_0).to.not.be.undefined;
      expect(byte_1).to.not.be.undefined;
      expect(byte_0).to.be.equal(1n); // bigint literal
      expect(byte_1).to.be.equal(0n); // bigint literal
    });

    it("should use current reading offset", () => {
      // prepare
      reader.offset = 8;

      // act
      const byte_1 = reader.readUint64();

      // assert
      expect(reader.offset).to.be.equal(16); // reads 8b
      expect(byte_1).to.not.be.undefined;
      expect(byte_1).to.be.equal(0n); // bigint literal
    });
  });

  describe("readBuffer()", () => {
    let reader: Reader;
    beforeEach(() => {
      reader = new Reader(
        Buffer.from("000102030405060708090A0B0C0D0E0F", "hex"),
      );
    });

    it("should read correct number of bytes", () => {
      // act
      const buffer = reader.readBuffer(2); // read 2 bytes

      // assert
      expect(reader.offset).to.be.equal(2);
      expect(buffer.byteLength).to.be.equal(2);
    });

    it("should read multiple bytes from buffer", () => {
      // act
      const buffer_2 = reader.readBuffer(2); // read 2 bytes
      const buffer_4 = reader.readBuffer(4); // read 4 bytes

      // assert
      expect(reader.offset).to.be.equal(6);
      expect(buffer_2.byteLength).to.be.equal(2);
      expect(buffer_4.byteLength).to.be.equal(4);
      expect(Buffer.from(buffer_2).toString("hex")).to.be.equal("0001");
      expect(Buffer.from(buffer_4).toString("hex")).to.be.equal("02030405");
    });

    it("should use current reading offset", () => {
      // prepare
      reader.offset = 6;

      // act
      const byte_1 = reader.readBuffer(1); // read 1 byte

      // assert
      expect(reader.offset).to.be.equal(7); // reads 8b
      expect(byte_1).to.not.be.undefined;
      expect(Buffer.from(byte_1).toString("hex")).to.be.equal("06");
    });
  });
});
