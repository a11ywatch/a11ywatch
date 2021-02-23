/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";

const forked = fork(`${__dirname}/watch-forked`, [], { detached: true });

export const websiteWatch = (_?: any, res?: any): any => {
  forked.send({});
  forked.unref();
  if (res && "send" in res) {
    res.send(true);
  }
};
