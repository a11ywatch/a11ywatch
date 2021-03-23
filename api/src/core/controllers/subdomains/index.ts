/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import * as find from "./find";
import * as set from "./set";
import * as remove from "./remove";
import * as update from "./update";

const SubDomainController = ({ user } = { user: null }) => {
  return {
    ...find,
    ...set,
    ...remove,
    ...update,
  };
};

export { SubDomainController };
