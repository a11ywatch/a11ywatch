/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createCanvas, Image } from "canvas";
import type { Canvas } from "canvas";
import { log } from "@a11ywatch/log";

export const getImage = async (
  imageBase64: string,
  config: { width: number; height: number } = { width: 0, height: 0 }
): Promise<Canvas> => {
  if (!imageBase64) {
    return null;
  }
  const img = new Image();

  try {
    return await new Promise((resolve) => {
      img.onload = function () {
        const srcWidth = config.width || img.width;
        const srcHeight = config.height || img.width;
        const canvas = createCanvas(srcWidth, srcHeight);

        canvas.getContext("2d").drawImage(img, 0, 0, srcWidth, srcHeight);
        resolve(canvas);
      };

      img.onerror = function () {
        resolve(null);
      };

      img.src = imageBase64;
    });
  } catch (e) {
    log(e, { type: "error", container: "mav" });
    return null;
  }
};
