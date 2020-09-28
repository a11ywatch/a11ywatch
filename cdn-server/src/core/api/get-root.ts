/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { ROOT_VIEW } from "../../views";

export const getRoot = (req, res) => {
  res.send(ROOT_VIEW);
};
