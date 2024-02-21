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
 * @interface TemplateField
 * @description This interfaces serves to map binary data to one
 * of: buffer, uint8, uint16, uint32 or uint64 data types.
 * <br /><br />
 * @example Using the `TemplateField` interface
 * ```ts
 * const fst_field = { type: "uint8", data: new Uint8Array([1]) };
 * const snd_field = { type: "uint8", data: new Uint8Array([2]) };
 */
export interface TemplateField {
  type: "buffer" | "uint8" | "uint16" | "uint32" | "uint64";
  data: Uint8Array;
}
