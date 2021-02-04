/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getUser } from "../find";
import { isSameDay } from "date-fns";

export const updateScanAttempt = async ({ userId }) => {
  const [user, collection] = await getUser({ id: userId }, true);

  if (user) {
    const lastScanDate = new Date();

    let scanInfo = user?.scanInfo
      ? user?.scanInfo
      : {
          lastScanDate,
          scanAttempts: 0,
        };

    scanInfo.scanAttempts =
      scanInfo?.lastScanDate && !isSameDay(scanInfo?.lastScanDate, new Date())
        ? 1
        : scanInfo.scanAttempts + 1;

    if (
      (scanInfo?.scanAttempts >= 3 && user?.role === 0) ||
      (scanInfo?.scanAttempts > 10 && user?.role === 1)
    ) {
      return false;
    }

    scanInfo.lastScanDate = lastScanDate;

    await collection.findOneAndUpdate({ id: user.id }, { $set: { scanInfo } });

    return true;
  }
  return false;
};
