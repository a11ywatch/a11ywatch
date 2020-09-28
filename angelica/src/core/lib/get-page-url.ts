/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function getPageUrl(url: string) {
  if (url?.length) {
    const lchar = url.length - 1;

    return url[lchar] === "/" ? url.substring(0, lchar) : url;
  }
  return "";
}
