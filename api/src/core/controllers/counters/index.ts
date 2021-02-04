/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { connect } from "@app/database";
import { websiteSearchParams } from "@app/core/utils";

const getCounter = async ({ _id }, chain?: boolean) => {
  try {
    const [collection] = await connect("Counters");
    const counter = await collection.findOne({ _id });

    return chain ? [counter, collection] : counter;
  } catch (e) {
    console.error(e);
  }
};

const getNextSequenceValue = async (sequenceName) => {
  try {
    const [hascounter, collection] = await getCounter(
      {
        _id: sequenceName,
      },
      true
    );

    if (!hascounter) {
      await collection.insertOne({ _id: sequenceName, sequence_value: 0 });
      return 0;
    }

    const sequenceDocument = await collection.findOneAndUpdate(
      {
        _id: sequenceName,
      },
      { $inc: { sequence_value: 1 } },
      {
        returnNewDocument: true,
        projection: { sequence_value: 1, _id: 1 },
      }
    );
    return sequenceDocument?.value?.sequence_value;
  } catch (e) {
    console.error(e);
  }
};

const CountersController = ({ user } = { user: null }) => ({
  fixCounters: async (_, chain) => {
    try {
      const [collection] = await connect("Counters");
      const counters = await collection.find().limit(150).toArray();

      return chain ? [counters, collection] : counters;
    } catch (e) {
      console.error(e);
    }
  },
  getCounter,
  getNextSequenceValue,
  getCounters: async ({ userId, pageUrl, url }) => {
    try {
      const [collection] = await connect("Counters");
      return await collection
        .find(websiteSearchParams({ pageUrl, userId }))
        .limit(20)
        .toArray();
    } catch (e) {
      console.error(e);
    }
  },
});

export { getCounter, getNextSequenceValue, CountersController };
