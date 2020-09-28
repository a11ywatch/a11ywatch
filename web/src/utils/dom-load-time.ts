/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function domInteractive() {
  try {
    if ('performance' in window) {
      const perfEntries = performance?.getEntriesByType('navigation')
      // @ts-ignore
      return perfEntries?.length ? perfEntries[0]['domInteractive'] || 0 : 0
    }
    return 0
  } catch (e) {
    console.error(e)
    return 0
  }
}
