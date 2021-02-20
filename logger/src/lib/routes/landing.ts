/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { Router } from "express";

const landingRouter = Router();

landingRouter.get("/", (request, res) => {
  res.json({
    server_status: "online",
  });
});

export { landingRouter };
