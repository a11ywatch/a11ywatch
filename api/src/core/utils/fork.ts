/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { fork } from "child_process";
import { pubsub } from "@app/core/graph/subscriptions";

export const forkProcess = (
  props: any,
  workerPath: string = "watcher-crawl"
) => {
  const forked = fork(`${__dirname}/${workerPath}`, [], {
    detached: true,
  });
  forked.send({ ...props });
  forked.unref();

  forked.on("message", (message: any) => {
    if (message?.name && message?.key?.value) {
      pubsub.publish(message?.name, {
        [message?.key?.name]: message?.key?.value,
      });
    }
    if (message === "close") {
      forked.kill("SIGINT");
    }
  });
};
