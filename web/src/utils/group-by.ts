/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

// SHOULD only use for dynamic client changes. TODO: move filter group to ss
export const groupBy = (key: any) => (array: any[]) =>
  array.reduce((kv: any, obj: any) => {
    const value = obj[key]
    kv[value] = (kv[value] || []).concat(obj)
    return kv
  }, {})
