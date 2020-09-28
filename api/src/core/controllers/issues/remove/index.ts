/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

// import { isSameDay } from "date-fns";
import { WEBSITE_NOT_FOUND } from "@app/core/strings";
import { getIssue } from "../find";

interface Props {
  userId?: number;
  url?: string;
  deleteMany?: boolean;
}

export const removeIssue = async ({
  userId,
  url,
  deleteMany = false,
}: Props) => {
  const [siteExist, collection] = await getIssue({ userId, url }, true);

  let deleteMethod = "findOneAndDelete";
  let searchMethod: Props = { url };

  if (deleteMany) {
    deleteMethod = "deleteMany";
    searchMethod = { userId };
    siteExist.count = await collection.countDocuments(searchMethod);
  }

  if (siteExist) {
    const deleteFullfilled = await collection[deleteMethod](searchMethod);
    if (deleteFullfilled) {
      return siteExist;
    }
  }

  throw new Error(WEBSITE_NOT_FOUND);
};
