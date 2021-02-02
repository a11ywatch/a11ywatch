/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const usageExceededThreshold = ({
  audience,
  usage,
}: {
  audience: number;
  usage: number;
}): boolean => {
  return (
    (audience === 0 && usage >= 3) ||
    (audience === 1 && usage >= 100) ||
    (audience === 2 && usage >= 500)
  );
};
