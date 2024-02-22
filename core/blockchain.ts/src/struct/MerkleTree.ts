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
 * @class MerkleTree
 * @description This class serves as a base for merkle trees which consist of a
 * hash tree in which every leaf is labelled with the hash of a data block, and
 * every nodes that is not a leaf is labelled with the hash of its child nodes.
 * <br /><br />
 * In the context of blockchain networks, merkle trees are used as a fast-access
 * hierarchy of transaction hashes that permits verifying the presence of given
 * transaction hashes in a block, without querying the full transaction data.
 * <br /><br />
 * The format of hashes may vary from network to network due to using different
 * hashing algorithms.
 * <br /><br />
 * #### Parameters
 * Following *inputs* apply to the {@link Wallet} class:
 * | Input | Type | Required? | Description |
 * | --- | --- | --- | --- |
 * | `hashes` | `Uint8Array[]` | **Required** | An array of cryptographic hashes, e.g. sha3-256 transaction hashes. |
 * | `hashFunction` | `(h: Uint8Array) => Uint8Array` | **Required** | A hash function implementation, e.g. sha3_256. |
 * | `hashSize` | `number` | **Optional** | Contains the size of hashes produced with {@link hashFunction} in bytes, defaults to 32. |
 *
 * <br /><br />
 * @example Using the `MerkleTree` class
 * ```ts
 * const hashes = [
 *   "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F",
 *   "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F",
 *   "000102030405060708090A0B0C0D0E0F000102030405060708090A0B0C0D0E0F",
 * ];
 *
 * const newMerkleTree = new MerkleTree(hashes.map(
 *   h => Uint8Array.from(Buffer.from(h, "hex"))
 * ), (h: Uint8Array) => myCoolHashFunction(h));
 * ```
 * <br /><br />
 * #### Other links
 * {@link Block}
 * <br /><br />
 * @since v0.1.0
 */
export class MerkleTree {
  /**
   * Constant that contains a default size of hashes.
   *
   * @static
   * @access public
   * @var {number}
   */
  public static DEFAULT_HASH_SIZE: number = 32;

  /**
   * Contains the merkle root hash *after computation*.
   *
   * @access public
   * @var {Uint8Array}
   */
  public merkleRoot: Uint8Array;

  /**
   * Constructs a merkle tree object around a {@link hashes} array of hashes.
   * <br /><br />
   * The merkle root hash will automatically be computed during the creation
   * of the instance.
   *
   * @access public
   * @param   {Uint8Array[]}                    hashes          An array of cryptographic hashes, e.g. sha3-256 transaction hashes.
   * @param   {(h: Uint8Array) => Uint8Array}   hashFunction    A hash function implementation, e.g. sha3_256.
   * @param   {number}                          hashSize        Contains the size of hashes produced with {@link hashFunction} in bytes, defaults to 32.
   */
  public constructor(
    /**
     * An array of cryptographic hashes, e.g. sha3-256 transaction hashes.
     *
     * @access public
     * @example `[ new Uint8Array([1, 2]), new Uint8Array([3, 4]) ]`
     * @var {Uint8Array[]}
     */
    public hashes: Uint8Array[],

    /**
     * A hash function implementation, e.g. sha3_256.
     * <br /><br />
     * Using Bitcoin as an example, the merkle root hash is computed
     * using a **double SHA-256** hashing algorithm.
     *
     * @access public
     * @example `(h: Uint8Array) => myCoolHashFunction(h)`
     * @var {(h: Uint8Array) => Uint8Array}
     */
    protected hashFunction: (h: Uint8Array) => Uint8Array,

    /**
     * Contains the size of hashes produced with {@link hashFunction} in bytes,
     * defaults to 32.
     *
     * @access public
     * @var {number}
     */
    protected hashSize: number = MerkleTree.DEFAULT_HASH_SIZE,
  ) {
    this.merkleRoot = this.getRoot();
  }

  /**
   * Computes the merkle root hash of a merkle tree.
   * <br /><br />
   * This method is automatically called by the {@link constructor} and
   * returns the already computed merkle root hash for subsequent calls.
   * <br /><br />
   * Note that given an empty array of hashes, the merkle root hash will
   * always return an empty [zeroed] {@link hashSize}-sized hash.
   *
   * @access public
   * @returns {Uint8Array}  The computed merkle root hash or an empty {@link hashSize}-sized hash.
   */
  public getRoot(): Uint8Array {
    // return empty hash if none available
    if (!this.hashes.length) {
      return new Uint8Array(this.hashSize);
    }

    // return root if already computed
    if (this.merkleRoot !== undefined) {
      return this.merkleRoot;
    }

    // compute merkle root hash
    return this.computeMerkleRoot();
  }

  /**
   * Computes the merkle root hash of a merkle tree.
   * <br /><br />
   * If the number of hashes is not *even*, the last hash of the
   * tree will be cloned and added to the list of hashes.
   * <br /><br />
   * This method uses the {@link hashFunction} hash function.
   *
   * @access protected
   * @returns {Uint8Array}  The computed merkle root hash.
   */
  protected computeMerkleRoot(): Uint8Array {
    // merkle trees need an **even** number of hashes,
    // if it's not the case we clone the last hash.
    if (this.hashes.length % 2 !== 0) {
      this.hashes.push(this.hashes[this.hashes.length - 1]);
    }

    // iterate through hashes until there is only one left
    const hashes: Uint8Array[] = this.hashes.slice();
    while (hashes.length > 1) {
      // moving 2-by-2 and concatenating hashes to form
      // a "parent" node using a hashing algorithm of choice
      for (let i = hashes.length; i > 1; i -= 2) {
        const nodeHash = Buffer.concat([hashes[i - 2], hashes[i - 1]]);
        hashes[i - 2] = this.hashFunction(nodeHash);
        hashes.pop();
      }
    }

    return hashes[0];
  }
}
