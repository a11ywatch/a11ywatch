/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const lazyLoader = (
  by: string,
  paths: string[] = ["find", "set", "remove", "update"]
) => {
  let modules = {};

  paths.forEach((folder: string) => {
    try {
      modules = {
        ...modules,
        ...require(`${by}${folder}`),
      };
    } catch (e) {
      console.error("module import failed", e);
    }
  });

  return modules;
};

export { lazyLoader };
