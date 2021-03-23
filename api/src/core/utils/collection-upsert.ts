/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const collectionUpsert = async (
  source: any,
  [collection, shouldUpdate, type],
  config?: any
) => {
  try {
    const userId = config?.searchProps?.userId || source?.userId;
    const queryParams = config?.searchProps
      ? config?.searchProps
      : { userId, pageUrl: config?.searchProps?.pageUrl || source?.pageUrl };

    if (typeof queryParams?.pageUrl === "undefined" && !queryParams.url) {
      queryParams.url = source?.url;
    }

    if (!shouldUpdate) {
      return await collection.insertOne(source);
    } else if (shouldUpdate === "many") {
      return await collection.updateMany(queryParams, { $set: source });
    } else {
      return await collection.updateOne(queryParams, { $set: source });
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};
