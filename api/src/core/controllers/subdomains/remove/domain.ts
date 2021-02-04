/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import {
  SUCCESS,
  SUCCESS_DELETED_ALL,
  WEBSITE_NOT_FOUND,
} from "@app/core/strings";
import { getDomain } from "../find";

export const removeDomain = async ({ userId, url, deleteMany = false }) => {
  const [siteExist, collection] = await getDomain({ userId, url }, true);

  if (deleteMany) {
    await collection.deleteMany({ userId });
    return { code: 200, success: true, message: SUCCESS_DELETED_ALL };
  }

  if (siteExist) {
    await collection.findOneAndDelete({ url });
    return { website: siteExist, code: 200, success: true, message: SUCCESS };
  }

  throw new Error(WEBSITE_NOT_FOUND);
};
