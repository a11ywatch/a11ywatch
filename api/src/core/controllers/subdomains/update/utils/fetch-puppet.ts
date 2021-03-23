/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import fetch from "node-fetch";
import { log } from "@a11ywatch/log";

export const fetchPuppet = async ({
  userId,
  url,
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
          authed: Boolean(authed),
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (data.status === 200) {
      dataSource = await data?.json();
    }
  } catch (e) {
    log(e);
  }

  return dataSource;
};
