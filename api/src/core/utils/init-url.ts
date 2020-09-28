/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { config } from "../../config";

// filter used for localhost parsing. We need to map this to our docker instances. LOGIC IS CONFUSING and needs to be remapped
export const initUrl = (url: string, filter?: boolean): string => {
  if (!url) {
    return "";
  }
  if (config.DOCKER_ENV) {
    if (filter && url?.includes("http://localhost:8050")) {
      return url?.replace("localhost:8050", "example-site:8050");
    } else if (url.includes("example-site")) {
      return url?.replace("example-site:8050", "localhost:8050");
    }
  }
  return url?.toLowerCase();
};
