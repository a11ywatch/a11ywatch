/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { DEV } from "@app/config";

export const checkCdn = async ({ page, cdnMinJsPath, cdnJsPath }) => {
  let hasCdn = false;
  const srcMin =
    DEV && String(cdnMinJsPath).includes("localhost")
      ? decodeURIComponent(cdnMinJsPath)
      : cdnMinJsPath;
  try {
    hasCdn = await page.$eval(`script[src$="${srcMin}"]`, (sources) => true);
  } catch (e) {}
  if (!hasCdn) {
    const src =
      DEV && String(cdnJsPath).includes("localhost")
        ? decodeURIComponent(cdnJsPath)
        : cdnJsPath;
    try {
      hasCdn = await page.$eval(`script[src$="${src}"]`, (sources) => true);
    } catch (e) {}
  }
  return hasCdn;
};
