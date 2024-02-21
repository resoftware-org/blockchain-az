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
 * @interface Parameters
 * @description This interface defines the *requirements* for
 * *sets of parameters*.
 * <br /><br />
 * Use this interface whenever you are *defining a new contract*
 * or *creating sets of inputs or parameters* to be passed to a
 * contract.
 * <br /><br />
 * Note that this interface is currently still empty and only
 * present for future-upgradeability of contract parameters,
 * if necessary. Also, due to the usage of `eslint`, a custom
 * `"@typescript-eslint/no-empty-interface": "off"` has been
 * added to the `eslint` configuration to permit the creation
 * of this interface and usage of it in child interfaces.
 * <br /><br />
 * @example Using the `Parameters` interface
 * ```ts
 * // creating custom parameters
 * const params = {
 *   coolness: "with a cool 8-) value",
 * } as Parameters;
 * ```
 * <br /><br />
 * @since v0.1.0
 */
export interface Parameters {}
