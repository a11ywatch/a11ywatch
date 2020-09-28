/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function getHostName(url: string) {
  return url?.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)[2] || null;
}

export const getHostAsString = new String(
  `function getHostName(url) {
    var re = new RegExp("//(www[0-9]?.)(.[^/:]+)", "i");
    try {
      return (url === null || url === void 0 ? void 0 : url.match(re)[2]) || null;    
    } catch(e) {
      console.log(e);
    }
}
`
);
