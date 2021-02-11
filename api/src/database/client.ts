/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { MongoClient } from "mongodb";
import { config, TEST_ENV } from "@app/config";

interface Global extends NodeJS.Global {
  __MONGO_URI__?: string;
  __MONGO_DB_NAME__?: string;
}

const appGlobal: Global = global;

const [DB_URI, DB_NAME, DB_CONFIG] = TEST_ENV
  ? [
      appGlobal?.__MONGO_URI__,
      appGlobal?.__MONGO_DB_NAME__,
      {
        useUnifiedTopology: true,
      },
    ]
  : [
      config.DB_URL,
      config.DB_NAME,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ];

let client;

try {
  client = new MongoClient(DB_URI, DB_CONFIG);
} catch (e) {
  console.error(e);
}

const initDbConnection = async (cb?: () => void) => {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    if (typeof cb === "function") {
      cb();
    }
  }
};

const connect = async (collectionType = "Websites") => {
  let db;

  try {
    db = await client.db(DB_NAME);
  } catch (e) {
    console.error("database connection failed:", e);
  }

  let collection = [];

  if (db) {
    try {
      collection = await db.collection(collectionType);
    } catch (e) {
      console.error("collection not found:", e);
    }
  }

  return [collection, client];
};

const closeDbConnection = async () => {
  try {
    await client?.close();
    console.log("DB connection closed");
  } catch (e) {
    console.error("failed to kill db connection", e);
  }
};

export { client, connect, initDbConnection, closeDbConnection };
