/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getUser } from "../find";
import { isSameDay } from "date-fns";

export const updateApiUsage = async (
  { email, id, emailConfirmCode },
  chain?: boolean
) => {
  try {
    const [user, collection] = await getUser({ id }, true);
    if (!user) {
      return chain ? [user, collection] : user;
    }

    const maxLimit = user.role === 0 ? 3 : user.role === 1 ? 100 : 500;
    const currentUsage = user?.apiUsage?.usage || 1;
    const blockScan = currentUsage >= maxLimit;

    let resetData = false;

    const lastScanDate = new Date();

    if (!isSameDay(user?.apiUsage?.lastScanDate, lastScanDate)) {
      resetData = true;
    }

    if (blockScan && !resetData) {
      return chain ? [user, collection] : user;
    }

    const updateCollectionProps = !resetData
      ? {
          apiUsage: { usage: user?.apiUsage?.usage + 1, lastScanDate },
        }
      : { apiUsage: { usage: 1, lastScanDate } };

    user.apiUsage = updateCollectionProps.apiUsage;

    await collection.updateOne({ id }, { $set: updateCollectionProps });

    return chain ? [user, collection] : user;
  } catch (e) {
    console.error(e);
  }
};
