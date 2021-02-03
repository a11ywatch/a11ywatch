/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const SubDomainController = ({ user } = { user: null }) => {
  return {
    getDomain: require("./find").getDomain,
    getDomains: require("./find").getDomains,
    addDomain: require("./set").addDomain,
    removeDomain: require("./remove").removeDomain,
    updateDomain: require("./update").updateDomain,
    generateWebsiteAverage: require("./update").generateWebsiteAverage,
    crawlWebsite: require("./update").crawlWebsite,
    scanWebsite: require("./update").scanWebsite,
  };
};

export { SubDomainController };
