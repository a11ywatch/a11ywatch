/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { IssuesController } from "../controllers/issues";

export const Issue = {
  issue: async ({ userId, url }) => {
    return await IssuesController().getIssue({
      id: userId,
      url,
    });
  },
};
