/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const formatCdn = (
  pageUrl: string,
  config: { adaTrim: boolean } = {
    adaTrim: false,
  }
): string => {
  if (pageUrl) {
    const trt = pageUrl
      .replace(/^(?:https?:\/\/)?/i, "")
      .replace(/\//g, "-")
      .replace(/\?/g, "-")
      .replace(/\./g, "-");

    return !config.adaTrim ? `${trt.replace(/\./g, "-")}-ada-fix` : trt;
  }
  return "";
};

export const stringFormater = {
  formatCdn,
};
