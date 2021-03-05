/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

process.on("message", async ([{ pageUrl, userId }, update]) => {
  console.log("syncing collections", pageUrl, userId);

  try {
  } catch (e) {
    console.error(e);
  } finally {
    process.send("close");
  }
});
