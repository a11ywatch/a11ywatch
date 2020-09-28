/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const { createCanvas, Image } = require("canvas");
const { aiModels } = require("./ai-models");

interface ClassifyModelType {
  className: string;
  probability: number;
}

// TODO: generate img from TENSOR 8byte array: removes node canvas need
export const detectImageModel = async (
  imageBase64: string,
  config: { width: number; height: number } = { width: 0, height: 0 }
): Promise<ClassifyModelType> => {
  if (!imageBase64) {
    return null;
  }
  let predictions = [];

  try {
    const mobileNetModel = await aiModels.initMobileNet(true);
    const img = new Image();

    const canv = await new Promise((resolve) => {
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

    if (!canv) {
      return null;
    }

    predictions = await mobileNetModel?.classify(canv);

    if (predictions?.length && predictions[0].probability <= 0.3) {
      const cocoaSDModel = await aiModels.initcocoSSD(true);
      predictions = await cocoaSDModel?.detect(canv);
    }

    const pred = predictions?.length
      ? {
          className: predictions[0].className || predictions[0].class,
          probability: predictions[0].probability || predictions[0].score,
        }
      : null;

    console.log("Predictions: ", pred);
    return pred;
  } catch (e) {
    console.error(e);
    return null;
  }
};
