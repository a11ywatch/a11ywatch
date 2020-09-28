/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

// import { isSameDay } from "date-fns";
import { getIssue } from "../find";
import { SUCCESS } from "@app/core/strings";

export const addIssue = async ({ userId, url, issue }: any) => {
  const [issueExist, collection] = await getIssue({ userId, url, issue }, true);

  if (!issueExist) {
    const id = await collection.countDocuments({ userId, url });

    const newIssue = {
      userId,
      issue,
      id,
      url,
    };

    collection.insertOne(newIssue);
  }

  return { code: 200, success: true, message: SUCCESS };
};
