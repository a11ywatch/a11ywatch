/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { join } from "path";
import { DEV, getFile } from "../../lib";

const getScript = (req, res) => {
  const url = `/scripts/${req.params.domain}/${req.params.cdnPath}`;

  try {
    DEV ? res.sendFile(join(`${__dirname}/../../${url}`)) : getFile(url, res);
  } catch (e) {
    console.error(e);
    res.send(false);
  }
};

export { getScript };
