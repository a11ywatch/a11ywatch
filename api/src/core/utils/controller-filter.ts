/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function websiteSearchParams({
  userId,
  url,
  pageUrl,
  domain,
  filter,
}: {
  userId?: any;
  url?: string;
  pageUrl?: string;
  domain?: string;
  filter?: string;
}) {
  let searchProps = {};

  if (typeof userId !== "undefined") {
    searchProps = {
      userId: Number(userId),
    };
  }

  if (typeof url !== "undefined") {
    searchProps = Object.assign({}, searchProps, { url });
  }
  if (typeof pageUrl !== "undefined") {
    searchProps = Object.assign({}, searchProps, { pageUrl });
  }
  if (typeof domain !== "undefined") {
    searchProps = Object.assign({}, searchProps, { domain });
  }

  return searchProps;
}
