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
import { Reader } from "../buffer/Reader";

/**
 * @abstract
 * @class Transaction
 * @description This class serves as a base for transactions as described by
 * a peer-to-peer network protocol. Typically, transactions contain a header
 * and a list of operation-specific field values.
 * <br /><br />
 * The appearance of transactions on the network, as well as the format used
 * for the binary structure, varies highly from network to network. The
 * same is true for block objects.
 * <br /><br />
 * #### Parameters
 * Following *inputs* apply to the {@link Transaction} class:
 * | Input | Type | Required? | Description |
 * | --- | --- | --- | --- |
 * | `buffer` | `Uint8Array` | **Required** | Contains the actual data of the transaction as implemented and described in child classes with {@link toBuffer}. |
 *
 * <br /><br />
 * @example Using the `Transaction` class
 * ```ts
 * const tx_0 = new Transaction(new Uint8Array([1]));
 * ```
 * <br /><br />
 * #### Other links
 * {@link Block}
 * <br /><br />
 * @since v0.1.0
 */
export abstract class Transaction {
  /**
   * Contains the transaction hash as produced with {@link getHash}.
   * <br /><br />
   * The {@link getHash} method must be implemented in child classes.
   * <br /><br />
   * This property's value defaults to an empty buffer (0 bytes).
   *
   * @access protected
   * @var {Uint8Array}
   */
  protected hash: Uint8Array = new Uint8Array(0);

  /**
   * Constructs a transaction object around a {@link buffer} data structure.
   *
   * @access public
   * @param   {Uint8Array}   buffer  The binary representation of the transaction.
   */
  public constructor(
    /**
     * Contains the actual data of the transaction as implemented
     * and described in child classes with {@link toBuffer}.
     *
     * @access protected
     * @var {Uint8Array | undefined}
     */
    protected buffer?: Uint8Array | undefined,
  ) {}

  /**
   * Get the binary data of a transaction as described by a given blockchain
   * network. The {@link toBuffer} method must be implemented in child
   * classes.
   *
   * @access public
   * @returns {Uint8Array}
   */
  public getBuffer(): Uint8Array {
    if (this.buffer) {
      return this.buffer;
    }

    // use implementation from child classes
    this.buffer = this.toBuffer();
    return this.buffer;
  }

  /**
   * Get the cryptographic hash of a transaction, which serves as the primary
   * identifier of a transaction - the transaction hash.
   * <br /><br />
   * Implementations for this method may vary from one network to the other.
   *
   * @abstract
   * @access public
   * @returns {Uint8Array}
   */
  public abstract getHash(): Uint8Array;

  /**
   * Get the binary data of a transaction as described by a given blockchain
   * network.
   * <br /><br />
   * Implementations for this method may vary from one network to the other.
   *
   * @abstract
   * @access public
   * @returns {Uint8Array}
   */
  public abstract toBuffer(): Uint8Array;

  /**
   * Build a transaction from its binary data as described by a given blockchain
   * network.
   * <br /><br />
   * Implementations for this method may vary from one network to the other.
   *
   * @abstract
   * @access public
   * @param   {Uint8Array | Reader}   reader    The buffer to be read, or a prepared buffer reader.
   * @returns {Block}
   */
  public abstract fromBuffer(reader: Uint8Array | Reader): Transaction;

  /**
   * Clones a transaction into a new instance.
   * <br /><br />
   * Implementations for this method may vary from one network to the other.
   *
   * @abstract
   * @access public
   * @returns {Transaction}
   */
  public abstract clone(): Transaction;
}
