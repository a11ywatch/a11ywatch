/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { fork } from "child_process";

const forked = fork(`${__dirname}/worker`, [], { detached: true });

export const forkProcess = ({ urlMap, userId }: any) => {
  forked.send({ urlMap, userId });
  forked.unref();
};
