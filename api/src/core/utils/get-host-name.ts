/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function getHostName(url: string): string {
  return url?.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)[2] || null;
}
