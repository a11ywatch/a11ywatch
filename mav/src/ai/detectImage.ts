/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { aiModels } from "./ai-models";
import { log } from "@a11ywatch/log";
import { getImage } from "./canvas-image";

interface ClassifyModelType {
  className: string;
  probability: number;
}

export const detectImageModel = async (
  imageBase64: string,
  config: { width: number; height: number } = { width: 0, height: 0 }
): Promise<ClassifyModelType> => {
  const canv = await getImage(imageBase64, config);

  let predictions = [];

  try {
    const mobileNetModel = await aiModels.initMobileNet(1);

    predictions = await mobileNetModel?.classify(canv);

    if (predictions?.length && predictions[0].probability <= 0.3) {
      const cocoaSDModel = await aiModels.initcocoSSD(1);
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
    log(e, { type: "error", container: "mav" });
    return null;
  }
};
