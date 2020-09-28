/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const issueSort = (a: any, b: any) => {
  if (a.type === 'error' && b.type !== 'error') {
    return -1
  }
  if (a.type === 'warning' && b.type !== 'error') {
    return -2
  }
  return 0
}
