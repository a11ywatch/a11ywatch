/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const grabHtmlSource = async ({
  page,
  grabHtml,
}: {
  page: any;
  grabHtml: boolean;
}): Promise<[string, number]> => {
  try {
    return await page?.$eval(
      `html`,
      (sources) =>
        [
          // sources?.outerHTML,
          "",
          window.performance.timing.domContentLoadedEventEnd -
            window.performance.timing.navigationStart,
        ] as const
    );
  } catch (e) {
    console.error(e);
    return ["", null];
  }
};
