/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { app, init, apiRouter, landingRouter } from "./lib";

app.use("/", landingRouter);
app.use("/api", apiRouter);

const server = init(app);

export { server };
