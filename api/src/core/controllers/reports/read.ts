/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { connect } from "@app/database";

export const getReport = async (url: string, timestamp?: string | number) => {
  try {
    const [collection] = await connect("Reports");
    const findBy =
      typeof timestamp !== "undefined"
        ? { url, timestamp: Number(timestamp) }
        : { url };
    const report = await collection.findOne(findBy);

    if (!report) {
      return await collection.findOne({ url });
    }

    return report;
  } catch (e) {
    console.error(e);
  }
};
