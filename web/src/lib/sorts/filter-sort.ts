/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const filterSort = (datasource: any[] = [], params: any) =>
  datasource?.filter(({ domain }) => domain?.includes(params))
