/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { fork } from "child_process";

export const forkProcess = (
  props: any,
  workerPath: string = "watcher-crawl"
) => {
  const forked = fork(`${__dirname}/workers/${workerPath}`, [], {
    detached: true,
  });
  forked.send(props);
  forked.unref();

  forked.on("message", (message: string) => {
    if (message === "close") {
      forked.kill("SIGINT");
    }
  });
};
