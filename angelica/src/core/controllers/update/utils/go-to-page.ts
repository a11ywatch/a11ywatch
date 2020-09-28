/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const skippedResources = [
  "quantserve",
  "adzerk",
  "doubleclick",
  "adition",
  "exelator",
  "sharethrough",
  "cdn.api.twitter",
  "google-analytics",
  "googletagmanager",
  "google",
  "fontawesome",
  "facebook",
  "analytics",
  "optimizely",
  "clicktale",
  "mixpanel",
  "zedo",
  "clicksor",
  "tiqcdn",
  "livereload",
  "cdn.jsdelivr.net",
];

const blockedResourceTypes = [
  "media",
  "font",
  "texttrack",
  "object",
  "beacon",
  "csp_report",
  "imageset",
  "websocket",
];

const goToPage = async (
  page: any,
  url: string,
  browser: any,
  retryCount: number = 0
): Promise<[boolean, string]> => {
  let hasPage = true;

  if (retryCount === 0 && page) {
    try {
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const requestUrl = request._url.split("?")[0].split("#")[0];
        if (
          blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
          skippedResources.some(
            (resource) => requestUrl.indexOf(resource) !== -1
          )
        ) {
          request.abort();
        } else {
          request.continue();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  try {
    await page?.goto(url, {
      timeout: retryCount === 0 ? 20000 : 5000,
      waitUntil: "networkidle2",
    });
  } catch (e) {
    console.log(`ISSUE LOADING: ${url}:`, e);
    hasPage = false;
  }

  return [hasPage, url];
};

export { goToPage };
