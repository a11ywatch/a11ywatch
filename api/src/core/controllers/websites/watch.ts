/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";

export const websiteWatch = (_?: any, res?: any): any => {
  try {
    const forked = fork(`${__dirname}/watch-forked`, [], { detached: true });
    forked.send({});
    forked.unref();

    forked.on("message", (message: string) => {
      if (message === "close") {
        forked.kill("SIGINT");
      }
    });

    if (res && "send" in res) {
      res.send(true);
    }
  } catch (e) {
    console.error(e);
  }
};
