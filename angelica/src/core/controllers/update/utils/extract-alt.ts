/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

interface Img {
  className: string;
  probability: number;
}

export const extractAlt = (img: Img): string => {
  if (img?.className) {
    return img.className.includes(",")
      ? img.className.substr(0, img.className.indexOf(","))
      : img.className;
  }
  return "";
};
