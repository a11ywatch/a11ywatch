/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const DEV: boolean = process.env.NODE_ENV !== "production";
export const PORT: number =
  process.env.NODE_ENV === "test" ? 0 : parseInt(process.env.PORT, 10) || 8022;
