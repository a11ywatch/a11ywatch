/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import {
  getWebsitesCrawler,
  getWebsite,
  getWebsites,
  getWebsitesWithUsers,
} from "./find";
import { updateWebsite } from "./update";
import { addWebsite } from "./set";
import { removeWebsite } from "./remove";

export const WebsitesController = ({ user } = { user: null }) => ({
  getWebsite,
  getWebsites,
  getWebsitesCrawler,
  getWebsitesWithUsers,
  addWebsite,
  removeWebsite,
  updateWebsite,
});
