/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { MongoClient } from "mongodb";
import { config } from "@app/config";

const { DB_URL, DB_NAME } = config;

export const client = new MongoClient(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const initDbConnection = async (cb) => {
  try {
    await client.connect();

    if (cb && typeof cb === "function") {
      cb();
    }
  } catch (e) {
    console.error("DB: FAILED", e);
  }
};

export const connect = async (collectionType = "Websites") => {
  try {
    const db = await client.db(DB_NAME);
    const collection = await db.collection(collectionType);
    return [collection, client];
  } catch (e) {
    console.error(e);
  }
};
