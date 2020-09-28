/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import fetch from "node-fetch";

export const fetchPuppet = async ({
  userId,
  url,
  firstPage,
  lastPage,
  shared,
  lastShared,
  pageHeaders,
  authed = true,
}: any) => {
  let dataSource;
  try {
    const data = await fetch(
      `${process.env.PUPPET_SERVICE}/api/getPageIssues`,
      {
        method: "POST",
        body: JSON.stringify({
          pageHeaders: pageHeaders && Array(pageHeaders),
          url: String(encodeURIComponent(url)),
          userId: Number(userId),
          firstPage: Boolean(firstPage),
          lastPage: Boolean(lastPage),
          shared: Boolean(shared),
          authed: Boolean(authed),
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (data.status === 200) {
      const source = await data?.text();

      dataSource =
        (source?.length && source[0] !== "<" && JSON.parse(source)) || null;
    }
  } catch (e) {
    console.error(e);
  }

  return dataSource;
};
