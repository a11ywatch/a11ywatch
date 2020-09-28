/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { config, MAIN_API_URL } from "./index";

export const corsOptions = {
  origin: [MAIN_API_URL + ""],
};

export const logServerInit = (port: number) => {
  console.log(
    `🚀 Server ready at ${config.DEV ? "localhost" : "a11ywatch"}:${port}`
  );
};
