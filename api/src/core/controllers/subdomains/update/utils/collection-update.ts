/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

// DYNAMIC COLLECTION UPDATES
export const collectionUpdate = async (
  source: any,
  [collection, shouldUpdate, type],
  config?: any
) => {
  try {
    const userId = config?.searchProps?.userId || source?.userId;
    const pageUrl = config?.searchProps?.pageUrl || source?.pageUrl;
    const queryParams = config?.searchProps
      ? config?.searchProps
      : { userId, pageUrl };

    if (!shouldUpdate) {
      console.log(
        `INSERTING ${type}: ${pageUrl || config?.searchProps?.domain}`
      );
      return await collection.insertOne(source);
    } else if (shouldUpdate === "many") {
      console.log(
        `UPDATING_MANY ${type}: ${pageUrl || config?.searchProps?.domain}`
      );
      return await collection.updateMany(queryParams, { $set: source });
    } else {
      console.log(
        `UPDATING ${type}: ${pageUrl || config?.searchProps?.domain}, params:`
      );
      return await collection.updateOne(queryParams, { $set: source });
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};
