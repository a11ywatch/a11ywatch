/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const realUser = (userId?: number): boolean | number =>
  typeof userId !== "undefined" &&
  (Number(userId) < 0 || userId || userId === 0);
