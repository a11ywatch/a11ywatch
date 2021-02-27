/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
export const blockWebsiteAdd = ({
  audience,
  collectionCount,
}: any): boolean => {
  if (audience === "admin" || audience === 3) {
    return false;
  }
  return (
    (!audience && collectionCount === 1) ||
    (audience === 1 && collectionCount === 4) ||
    (audience === 2 && collectionCount === 10)
  );
};
