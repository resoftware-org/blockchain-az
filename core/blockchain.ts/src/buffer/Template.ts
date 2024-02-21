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
// internal dependencies
import type { TemplateField } from "../types/TemplateField";
import { Writer } from "./Writer";

/**
 * @class Template
 * @description This class serves as a template for blockchain entities that
 * are prepared to be sent to blockchain nodes.
 * <br /><br />
 * In the context of blockchain networks, entities like blocks and transactions
 * are transferred over the network using pre-defined and structured payloads
 * but these payloads and their contents changes from one network to the other.
 * <br /><br />
 * #### Parameters
 * Following *inputs* apply to the {@link Wallet} class:
 * | Input | Type | Required? | Description |
 * | --- | --- | --- | --- |
 * | `fields` | `TemplateField` | **Optional** | Contains the fields that will be concatenated as a buffer. |
 *
 * <br /><br />
 * @example Using the `Template` class
 * ```ts
 * const template = new Template([
 *   { type: "buffer", data: Buffer.from("010203", "hex") },
 *   { type: "uint8", data: new Uint8Array([1]) },
 *   {
 *     type: "uint32",
 *     data: Uint8Array.from(
 *       Buffer.from("FFFFFFFF", "hex") // 4_294_967_295
 *     )
 *   }
 * ]);
 *
 * template.toBuffer(); // 01020301FFFFFFFF
 * ```
 * <br /><br />
 * #### Other links
 * {@link Writer}
 * <br /><br />
 * @since v0.1.0
 */
export class Template {
  /**
   * Contains the total byte length summed from all the
   * {@link fields} of this template instance.
   * <br /><br />
   * This property can be used to allocate the correct
   * number of bytes for a buffer template.
   *
   * @access public
   * @var {number}
   */
  public byteLength: number;

  /**
   * Constructs a template object that contains {@link fields}.
   *
   * @access public
   * @param   {TemplateField[]}   fields    Contains the fields that will be concatenated as a buffer.
   */
  public constructor(
    /**
     * Contains the fields that will be concatenated as a buffer.
     *
     * @access public
     * @var {TemplateField[]}
     */
    public fields: TemplateField[] = [],
  ) {
    this.byteLength = this.fields
      .map((f) => f.data.byteLength)
      .reduce((prev, cur) => prev + cur, 0);
  }

  /**
   * Uses a {@link Writer} instance around a {@link byteLength}-sized
   * buffer to write (concatenate) {@link fields} one after the other.
   * <br /><br />
   * Note that this method uses the {@link TemplateField} interface's
   * `type` field to determine how a specific field is aligned.
   *
   * @access public
   * @returns {Uint8Array}  The resulting buffer of size {@link byteLength} with all {@link fields} concatenated.
   */
  public toBuffer(): Uint8Array {
    const buffer = Buffer.allocUnsafe(this.byteLength);
    const writer = new Writer(buffer);

    // writes field after field, taking into account which
    // type of field we are processing (by byte length)
    for (let i = 0; i < this.fields.length; i++) {
      const view = new DataView(this.fields[i].data.buffer);
      const field_type = this.fields[i].type;
      switch (field_type) {
        case "buffer":
          writer.writeBuffer(this.fields[i].data);
          break;

        default:
        case "uint8":
          writer.writeUint8(view.getInt8(0));
          break;
        case "uint16":
          writer.writeUint16(view.getInt16(0));
          break;
        case "uint32":
          writer.writeUint32(view.getInt32(0));
          break;
        case "uint64":
          writer.writeUint64(view.getBigInt64(0));
          break;
      }
    }

    return buffer;
  }
}
