/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import type { AddressInfo } from "net";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { corsOptions, logServerInit } from "./config";
import { root, crawl, detectImage, setScripts } from "./rest/routes";

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "100mb", extended: true }));

// GET
app.get("/", root);
// POST
app.post("/api/getPageIssues", crawl);
app.post("/api/detectImage", detectImage);
app.post("/api/updateScript", setScripts);

const coreServer = app.listen(process.env.PORT || 0, () => {
  logServerInit((coreServer.address() as AddressInfo).port);
});

export default coreServer;
