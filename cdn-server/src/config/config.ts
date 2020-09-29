/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const BUCKET_NAME: string = process.env.BUCKET_NAME;
export const DEV: boolean = process.env.NODE_ENV !== "production";
export const AWS_S3_ENABLED: boolean = !DEV && !!BUCKET_NAME;
export const PORT: number =
  process.env.NODE_ENV === "test" ? 0 : parseInt(process.env.PORT, 10) || 8090;
export const MAIN_API_URL: string = process.env.MAIN_API_URL;
export const ANGELICA_API_URL: string = process.env.ANGELICA_API_URL;
