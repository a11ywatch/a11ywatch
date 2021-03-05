/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import fetch from "node-fetch";

export const imageDetect = async ({ img }: { img: string }): Promise<any> => {
  let dataSource;
  try {
    const data = await fetch(`${process.env.MAV_CLIENT_URL}/api/parseImg`, {
      method: "POST",
      body: JSON.stringify({
        img: String(img),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (data.status === 200) {
      dataSource = await data?.json();
    }
  } catch (e) {
    console.error(e);
  }
  return dataSource;
};
