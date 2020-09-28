/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { app, init } from "./lib";
import {
  addScript,
  getRoot,
  getScript,
  downloadScript,
  ROOT,
  ADD_SCRIPT,
  DOWNLOAD_SCRIPT,
  GET_SCRIPT,
} from "./core/api";

app
  .get(ROOT, getRoot)
  .get(GET_SCRIPT, getScript)
  .get(DOWNLOAD_SCRIPT, downloadScript)
  .post(ADD_SCRIPT, addScript);

init();
