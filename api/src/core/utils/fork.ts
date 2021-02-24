/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { fork } from "child_process";

export const forkProcess = ({ urlMap, userId }: any) => {
  const forked = fork(`${__dirname}/workers/watcher-crawl`, [], {
    detached: true,
  });
  forked.send({ urlMap, userId });
  forked.unref();

  forked.on("message", (message: string) => {
    if (message === "close") {
      forked.kill("SIGINT");
    }
  });
};
