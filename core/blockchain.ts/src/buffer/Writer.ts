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
 * @class Writer
 * @description This class serves as a base for buffer writers of any
 * sorts. It is not specifically aimed at any blockchain-based data
 * but rather serves as a standard interface to write information in
 * a binary buffer.
 * <br /><br />
 * #### Parameters
 * Following *inputs* apply to the {@link Writer} class:
 * | Input | Type | Required? | Description |
 * | --- | --- | --- | --- |
 * | `buffer` | `Buffer` | **Required** | Contains the buffer being written to by this writer instance. |
 * | `offset` | `number` | **Optional** | Contains the offset (position) at which this writer instance must start writing to the buffer. |
 *
 * <br /><br />
 * @example Using the `Writer` class
 * ```ts
 * const buffer = Buffer.allocUnsafe(2); // allocating 2 bytes
 * const writer = new Writer(buffer);
 * buffer.writeUint8(0);
 * buffer.writeUint8(1);
 *
 * output.toString("hex"); // 0001
 * ```
 * <br /><br />
 * #### Other links
 * {@link Reader}
 * <br /><br />
 * @since v0.1.0
 */
export class Writer {
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
   * Constructs a writer object around a {@link buffer}, starting to write
   * at {@link offset}.
   *
   * @access public
   * @param   {Buffer}   buffer  The buffer (binary data).
   * @param   {number}   offset  The offset at which to start writing.
   */
  public constructor(
    /**
     * Contains the buffer being written to by this writer instance.
     *
     * @access public
     * @example `Buffer.allocUnsafe(32)`
     * @var {Buffer}
     */
    public buffer: Buffer,

    /**
     * Contains the offset (position) at which this writer instance
     * must start writing to the buffer.
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
  }

  /**
   * Writes exactly one (1) byte to {@link buffer} with the cursor
   * positioned at {@link offset}.
   * <br /><br />
   * This method can be used to write numbers from 0 to 255.
   *
   * @access public
   * @param   {number}  v     The value of the byte to be written.
   * @returns {Writer}  The writer instance to permit chaining of method calls.
   */
  public writeUint8(v: number): Writer {
    this.buffer[this.offset++] = v;
    return this;
  }

  /**
   * Writes exactly two (2) bytes to {@link buffer} with the cursor
   * positioned at {@link offset}.
   * <br /><br />
   * This method can be used to write numbers from 0 to 65_535.
   * <br /><br />
   * Caution: this method writes the bytes aligned with a little-endian
   * notation.
   *
   * @access public
   * @param   {number}  v     The value of the bytes to be written.
   * @returns {Writer}  The writer instance to permit chaining of method calls.
   */
  public writeUint16(v: number): Writer {
    this.data.setUint16(this.offset, v, true); // true=littleEndian
    this.offset += 2;
    return this;
  }

  /**
   * Writes exactly four (4) bytes to {@link buffer} with the cursor
   * positioned at {@link offset}.
   * <br /><br />
   * This method can be used to write numbers from 0 to 4_294_967_295.
   * <br /><br />
   * Caution: this method writes the bytes aligned with a little-endian
   * notation.
   *
   * @access public
   * @param   {number}  v     The value of the bytes to be written.
   * @returns {Writer}  The writer instance to permit chaining of method calls.
   */
  public writeUint32(v: number): Writer {
    this.data.setUint32(this.offset, v, true); // true=littleEndian
    this.offset += 4;
    return this;
  }

  /**
   * Writes exactly eight (8) bytes to {@link buffer} with the cursor
   * positioned at {@link offset}.
   * <br /><br />
   * This method can be used to write numbers from 0 to 18_446_744_073_709_551_615.
   * <br /><br />
   * Caution: this method writes the bytes aligned with a little-endian
   * notation.
   *
   * @access public
   * @param   {bigint}  v     The value of the bytes to be written as a BigInt.
   * @returns {Writer}  The writer instance to permit chaining of method calls.
   */
  public writeUint64(v: bigint): Writer {
    this.data.setBigUint64(this.offset, v, true); // true=littleEndian
    this.offset += 8;
    return this;
  }

  /**
   * Writes a number of bytes from {@link buf} to {@link buffer} with
   * the cursor positioned of {@link buf} at {@link index}.
   * <br /><br />
   * This method can be used to read binary data present in the buffer.
   * <br /><br />
   * This method does not change the endianness of the buffer.
   *
   * @access public
   * @param   {Uint8Array}  buf     The buffer being written to {@link buffer}.
   * @param   {number}      index   (Optional) The offset (position) in {@link buf}.
   * @returns {Writer}  The writer instance to permit chaining of method calls.
   */
  public writeBuffer(buf: Uint8Array, index: number = 0): Writer {
    for (let i = index; i < buf.byteLength; i++) {
      this.writeUint8(buf[i]);
    }
    return this;
  }
}
