/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { MongoClient } from "mongodb";
import { config } from "@app/config";
import { log } from "@a11ywatch/log";

let client;

const createClient = (): any =>
  new MongoClient(config.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

try {
  client = createClient();
} catch (e) {
  log(e);
}

const initDbConnection = async () => {
  try {
    if (process.send !== undefined) {
      client = createClient();
    }
    await client?.connect();
  } catch (e) {
    log(e);
  }
};

const connect = async (collectionType = "Websites") => {
  let collection = [];

  try {
    const db = await client?.db(config.DB_NAME);
    collection = await db?.collection(collectionType);
  } catch (e) {
    log(e);
  }

  return [collection, client];
};

const closeDbConnection = async () => {
  try {
    await client?.close();
  } catch (e) {
    log(e);
  }
};

export { client, connect, initDbConnection, closeDbConnection };
