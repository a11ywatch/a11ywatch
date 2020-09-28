/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getDomain, getDomains } from "./find";
import { addDomain } from "./set";
import { removeDomain } from "./remove";
import {
  scanWebsite,
  updateDomain,
  generateWebsiteAverage,
  crawlWebsite,
} from "./update";

const SubDomainController = ({ user } = { user: null }) => ({
  getDomain,
  getDomains,
  addDomain,
  removeDomain,
  updateDomain,
  generateWebsiteAverage,
  crawlWebsite,
  scanWebsite,
});

export { SubDomainController };
