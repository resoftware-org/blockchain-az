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
 * @abstract
 * @class Wallet
 * @description This class serves as a base for wallets which consist of
 * pairs of public- and private- keys.
 * <br /><br />
 * The format of keys may vary from network to network due to using different
 * hashing algorithms.
 * <br /><br />
 * #### Parameters
 * Following *inputs* apply to the {@link Wallet} class:
 * | Input | Type | Required? | Description |
 * | --- | --- | --- | --- |
 * | `publicKey` | `Uint8Array` | **Required** | Contains the bytes of data that form the public key. |
 * | `privateKey` | `Uint8Array` | **Optional** | Contains the bytes of data that form the private key. |
 *
 * <br /><br />
 * @example Using the `Wallet` class
 * ```ts
 * const wlt_0 = new Wallet(new Uint8Array([1, 2, 3, 4]));
 * ```
 * <br /><br />
 * #### Other links
 * {@link Transaction}
 * <br /><br />
 * @since v0.1.0
 */
export abstract class Wallet {
  /**
   * Constructs a wallet object around a a {@link publicKey} public key and
   * and optional {@link privateKey} private key.
   *
   * @access public
   * @param   {Uint8Array}   publicKey    Contains the bytes of data that form the public key.
   * @param   {Uint8Array}   privateKey   (Optional) Contains the bytes of data that form the private key.
   */
  public constructor(
    /**
     * Contains the bytes of data that form the public key.
     *
     * @access public
     * @example `Uint8Array.from(Buffer.from("000102030405060708090A0B0C0D0E0F", "hex"))`
     * @var {Buffer}
     */
    public publicKey: Uint8Array,

    /**
     * Contains the bytes of data that form the private key.
     *
     * @access public
     * @example `Uint8Array.from(Buffer.from("000102030405060708090A0B0C0D0E0F", "hex"))`
     * @var {Buffer}
     */
    protected privateKey?: Uint8Array,
  ) {}

  /**
   * Returns a `string`-typed hexadecimal representation of the
   * {@link publicKey}.
   *
   * @access public
   * @returns {string}  The hexadecimal representation of the {@link publicKey}.
   */
  public toHex(): string {
    return Buffer.from(this.publicKey).toString("hex");
  }

  /**
   * Get the address representation of a {@link publicKey}.
   * <br /><br />
   * Implementations for this method may vary from one network to the other.
   *
   * @abstract
   * @access public
   * @returns {Uint8Array}
   */
  public abstract toAddress(): Uint8Array;

  /**
   * Get the cryptographic hash of a {@link publicKey}.
   * <br /><br />
   * Implementations for this method may vary from one network to the other.
   *
   * @abstract
   * @access public
   * @returns {Uint8Array}
   */
  public abstract toHash(): Uint8Array;
}
