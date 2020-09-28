/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function arrayAverage(arr: any[] = []): number {
  let sum = 0;
  for (var i in arr) {
    sum += arr[i];
  }
  return sum / (arr?.length || 1);
}
