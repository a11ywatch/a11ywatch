/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { MAIN_API_URL } from "./config";

export const corsOptions = {
  origin: [MAIN_API_URL + ""],
};
