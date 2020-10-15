/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { MongoClient } from "mongodb";
import { config } from "@app/config";

const client = new MongoClient(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const initDbConnection = async (cb?: Function) => {
  try {
    await client.connect();
    if (cb && typeof cb === "function") {
      cb();
    }
  } catch (e) {
    console.error("database connection establishment failed:", e);
  }
};

const connect = async (collectionType = "Websites") => {
  try {
    const db = await client.db(config.DB_NAME);
    const collection = await db.collection(collectionType);
    return [collection, client];
  } catch (e) {
    console.error("database connection failed:", e);
  }
};

export { client, connect, initDbConnection };
