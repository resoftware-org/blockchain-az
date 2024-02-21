/**
 * This file is part of Blockchain A-Z by re:Software S.L. shared under LGPL-3.0
 * Copyright (C) 2024-present re:Software S.L. (www.resoftware.es),
 * All rights reserved.
 *
 * @package     Blockchain.ts
 * @subpackage  API
 * @author      re:Software S.L. <devs@resoftware.es>
 * @license     LGPL-3.0
 */

/**
 * @class Reader
 * @description This class serves as a base for buffer readers of any
 * sorts. It is not specifically aimed at any blockchain-based data
 * but rather serves as a standard interface to read information from
 * a binary buffer.
 * <br /><br />
 * #### Parameters
 * Following *inputs* apply to the {@link Reader} class:
 * | Input | Type | Required? | Description |
 * | --- | --- | --- | --- |
 * | `buffer` | `Buffer` | **Required** | Contains the buffer being read by this reader instance. |
 * | `offset` | `number` | **Optional** | Contains the offset (position) at which this reader instance must start reading from the buffer. |
 *
 * <br /><br />
 * @example Using the `Reader` class
 * ```ts
 * const reader = new Reader(Buffer.from("0001", "hex"));
 * const fst_byte = reader.readUint8(); // 0
 * const snd_byte = reader.readUint8(); // 1
 * ```
 * <br /><br />
 * #### Other links
 * {@link Writer}
 * <br /><br />
 * @since v0.1.0
 */
export class Reader {
  /**
   * Contains the size of the buffer in bytes. This property
   * is filled with the byte-length from {@link buffer}.
   *
   * @access public
   * @var {number}
   */
  public size: number;

  /**
   * A data view built around the content and structure of
   * {@link buffer}, using its' byte-length and offset.
   *
   * @access public
   * @var {DataView}
   */
  public data: DataView;

  /**
   * Constructs a reader object around a {@link buffer}, starting to read
   * at {@link offset}.
   *
   * @access public
   * @param   {Buffer}   buffer  The buffer (binary data).
   * @param   {number}   offset  The offset at which to start reading.
   */
  public constructor(
    /**
     * Contains the buffer being read by this reader instance.
     *
     * @access public
     * @example `Buffer.from("010203", "hex")`
     * @var {Buffer}
     */
    public buffer: Buffer,

    /**
     * Contains the offset (position) at which this reader instance
     * must start reading from the buffer. In case the offset is too
     * big or too small (negative), it will be automatically set to 0.
     *
     * @access public
     * @var {number}
     */
    public offset: number = 0,
  ) {
    this.size = buffer.byteLength;
    this.data = new DataView(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength,
    );

    // do not allow position overflow
    if (this.offset < 0 || this.offset >= buffer.length) {
      this.offset = 0;
    }
  }

  /**
   * Reads exactly one (1) byte from {@link buffer} with the cursor
   * positioned at {@link offset} and returns its' number value.
   * <br /><br />
   * This method can be used to read numbers from 0 to 255.
   *
   * @access public
   * @returns {number}  The value of the byte at the current offset.
   */
  public readUint8(): number {
    return this.buffer[this.offset++];
  }

  /**
   * Reads exactly two (2) bytes from {@link buffer} with the cursor
   * positioned at {@link offset} and returns its' number value.
   * <br /><br />
   * This method can be used to read numbers from 0 to 65_535.
   * <br /><br />
   * Caution: this method expects the bytes to be aligned with a
   * little-endian notation.
   *
   * @access public
   * @returns {number}  The value of the bytes starting at the current offset.
   */
  public readUint16(): number {
    this.offset += 2;
    return this.data.getUint16(this.offset - 2, true); // true=littleEndian
  }

  /**
   * Reads exactly four (4) bytes from {@link buffer} with the cursor
   * positioned at {@link offset} and returns its' number value.
   * <br /><br />
   * This method can be used to read numbers from 0 to 4_294_967_295.
   * <br /><br />
   * Caution: this method expects the bytes to be aligned with a
   * little-endian notation.
   *
   * @access public
   * @returns {number}  The value of the bytes starting at the current offset.
   */
  public readUint32(): number {
    this.offset += 4;
    return this.data.getUint32(this.offset - 4, true); // true=littleEndian
  }

  /**
   * Reads exactly eight (8) bytes from {@link buffer} with the cursor
   * positioned at {@link offset} and returns its' number value.
   * <br /><br />
   * This method can be used to read numbers from 0 to 18_446_744_073_709_551_615.
   * <br /><br />
   * Caution: this method expects the bytes to be aligned with a
   * little-endian notation.
   *
   * @access public
   * @returns {bigint}  The value of the bytes starting at the current offset.
   */
  public readUint64(): bigint {
    this.offset += 8;
    return this.data.getBigUint64(this.offset - 8, true); // true=littleEndian
  }

  /**
   * Reads a given {@link size} number of bytes from {@link buffer} with
   * the cursor positioned at {@link offset} and returns a subarray.
   * <br /><br />
   * This method can be used to read binary data present in the buffer.
   * <br /><br />
   * This method does not change the endianness of the buffer.
   *
   * @access public
   * @returns {Uint8Array}  A subarray of {@link buffer} with given {@link size} starting at the current offset.
   */
  public readBuffer(size: number): Uint8Array {
    this.offset += size;
    return this.buffer.subarray(this.offset - size, this.offset);
  }
}
