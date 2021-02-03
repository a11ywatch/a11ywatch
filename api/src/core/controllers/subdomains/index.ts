/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const SubDomainController = ({ user } = { user: null }) => {
  return {
    ...require("./find"),
    ...require("./set"),
    ...require("./remove"),
    ...require("./update"),
  };
};

export { SubDomainController };
