/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./config";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const init = () =>
  app.listen(PORT, () => console.log(`server listening on port ${PORT}!`));

export { app, init };
