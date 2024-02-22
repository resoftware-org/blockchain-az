/**
 * This file is part of Blockchain A-Z by re:Software S.L. shared under LGPL-3.0
 * Copyright (C) 2024-present re:Software S.L. (www.resoftware.es),
 * All rights reserved.
 *
 * @package     Blockchain.ts
 * @subpackage  Tests
 * @author      re:Software S.L. <devs@resoftware.es>
 * @license     LGPL-3.0
 */
// external dependencies
import { expect } from "chai";

// internal dependencies
import * as Blockchain_ts from "../../src/Blockchain";

describe("Blockchain", () => {
  it("should export abstract classes", () => {
    expect(Blockchain_ts.Block).to.not.be.undefined;
    expect(Blockchain_ts.Transaction).to.not.be.undefined;
    expect(Blockchain_ts.Wallet).to.not.be.undefined;
  });

  it("should export buffer classes", () => {
    expect(Blockchain_ts.Reader).to.not.be.undefined;
    expect(Blockchain_ts.Template).to.not.be.undefined;
    expect(Blockchain_ts.Writer).to.not.be.undefined;
  });
});
