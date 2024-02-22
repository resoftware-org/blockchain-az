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
import { Transaction } from "./Transaction";
import { Reader } from "../buffer/Reader";

/**
 * @abstract
 * @class Block
 * @description This class serves as a base for blocks as described by
 * a peer-to-peer network protocol. Typically, blocks contain a header
 * and a list of transactions.
 * <br /><br />
 * The appearance of blocks on the network, as well as the format used
 * for the binary structure varies highly from network to network. The
 * same is true for transaction objects.
 * <br /><br />
 * #### Parameters
 * Following *inputs* apply to the {@link Block} class:
 * | Input | Type | Required? | Description |
 * | --- | --- | --- | --- |
 * | `previous` | `Block` | **Required** | Contains an instance describing the previous block. |
 *
 * <br /><br />
 * @example Using the `Block` class
 * ```ts
 * const block_0 = new Block();
 * const block_1 = new Block(block_0);
 * ```
 * <br /><br />
 * #### Other links
 * {@link Transaction}
 * <br /><br />
 * @since v0.1.0
 */
export abstract class Block {
  /**
   * Contains the actual data of the block as implemented
   * and described in child classes with {@link toBuffer}.
   *
   * @access protected
   * @var {Uint8Array | undefined}
   */
  protected buffer: Uint8Array | undefined;

  /**
   * Contains a list of transactions as instances of the
   * class {@link Transaction}.
   *
   * @access protected
   * @var {Transaction[]}
   */
  public transactions: Transaction[] = [];

  /**
   * Constructs a block object around a {@link previous} block.
   *
   * @access public
   * @param   {Block}   previous  The previous block in the chain.
   */
  public constructor(
    /**
     * Contains an instance describing the previous block.
     *
     * @access public
     * @var {Block}
     */
    public previous?: Block,
  ) {}

  /**
   * Get the binary data of a block as described by a given blockchain
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
   * Build the binary header of a block, which can be used to create a block
   * hash. This method is mainly useful for finding a hash that satisfies a
   * given difficulty.
   * <br /><br />
   * Implementations for this method may vary from one network to the other.
   *
   * @abstract
   * @access public
   * @returns {Uint8Array}
   */
  public abstract getHeader(): Uint8Array;

  /**
   * Get the cryptographic hash of a block, which serves as the primary
   * identifier of a block.
   * <br /><br />
   * Implementations for this method may vary from one network to the other.
   *
   * @abstract
   * @access public
   * @returns {Uint8Array}
   */
  public abstract getHash(): Uint8Array;

  /**
   * Get the binary data of a block as described by a given blockchain
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
   * Build a block from its binary data as described by a given blockchain
   * network.
   * <br /><br />
   * Implementations for this method may vary from one network to the other.
   *
   * @abstract
   * @access public
   * @param   {Uint8Array | Reader}   reader    The buffer to be read, or a prepared buffer reader.
   * @returns {Block}
   */
  public abstract fromBuffer(reader: Uint8Array | Reader): Block;
}
