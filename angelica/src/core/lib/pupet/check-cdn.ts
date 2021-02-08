/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { DEV } from "@app/config";

export const checkCdn = async ({ page, cdnMinJsPath, cdnJsPath }) => {
  let hasCdn = false;
  try {
    const srcMin =
      DEV && cdnMinJsPath.includes("localhost")
        ? decodeURIComponent(cdnMinJsPath)
        : cdnMinJsPath;
    hasCdn = await page.$eval(`script[src$="${srcMin}"]`, (sources) => true);
  } catch (e) {}
  if (!hasCdn) {
    try {
      const src =
        DEV && cdnJsPath.includes("localhost")
          ? decodeURIComponent(cdnJsPath)
          : cdnJsPath;
      hasCdn = await page.$eval(`script[src$="${src}"]`, (sources) => true);
    } catch (e) {}
  }
  return hasCdn;
};
