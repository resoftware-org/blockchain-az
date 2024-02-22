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
// This file contains imports of internal implementations
// and defines NAMED modules exports in the default scope.
// Furthermore, the library explicitly exports types.

// import types
import type { Parameters } from "./types/Parameters";
import type { TemplateField } from "./types/TemplateField";

// import classes
import { Block } from "./abstract/Block";
import { Transaction } from "./abstract/Transaction";
import { Wallet } from "./abstract/Wallet";
import { Reader } from "./buffer/Reader";
import { Template } from "./buffer/Template";
import { Writer } from "./buffer/Writer";
import { MerkleTree } from "./struct/MerkleTree";

// export named modules as default
export { Block, MerkleTree, Reader, Template, Transaction, Wallet, Writer };

// export *types* explicitly
export type { Parameters, TemplateField };
