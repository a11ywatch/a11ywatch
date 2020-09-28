/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import dotenv from "dotenv";

dotenv.config();

export const MAIN_API_URL = process.env.MAIN_API_URL;

export const config = {
  DEV: process.env.NODE_ENV !== "production",
  PORT: Number(process.env.PORT || 8020),
  DOCKER_ENV: process.env.DOCKER_ENV,
};
