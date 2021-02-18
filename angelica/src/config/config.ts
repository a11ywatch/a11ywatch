/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import dotenv from "dotenv";
import { replaceDockerNetwork } from "@a11ywatch/website-source-builder";

dotenv.config();

const DEV = process.env.NODE_ENV !== "production";
const DOCKER_ENV = process.env.DOCKER_ENV;

const SCRIPTS_CDN_URL_HOST = process.env.SCRIPTS_CDN_URL_HOST;
const MAIN_API_URL = process.env.MAIN_API_URL;
const AI_SERVICE_URL = replaceDockerNetwork(process.env.AI_SERVICE_URL);
const SCRIPTS_CDN_URL = replaceDockerNetwork(process.env.SCRIPTS_CDN_URL);

export {
  DEV,
  DOCKER_ENV,
  AI_SERVICE_URL,
  SCRIPTS_CDN_URL,
  SCRIPTS_CDN_URL_HOST,
  MAIN_API_URL,
};
