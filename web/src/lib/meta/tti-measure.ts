/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const measureCRP = (): number => {
  if (typeof window !== 'undefined') {
    const t = window.performance?.timing || { domComplete: 0, domLoading: 0 }

    return t.domComplete - t.domLoading
  }
  return 0
}

export { measureCRP }
