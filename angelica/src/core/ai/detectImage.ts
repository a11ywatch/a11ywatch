/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import fetch from "node-fetch";
import { AI_SERVICE_URL } from "@app/config";

const defaultConfig = {
  width: 0,
  height: 0,
};

interface ClassifyModelType {
  className: string;
  probability: number;
}

export const detectImageModel = async (
  img,
  config = defaultConfig
): Promise<ClassifyModelType> => {
  if (!img) {
    return null;
  }
  try {
    const data = await fetch(`${AI_SERVICE_URL}/api/parseImg`, {
      method: "POST",
      body: JSON.stringify({
        img: String(img),
        width: Number(config.width),
        height: Number(config.height),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (data.status === 200) {
      const result = await data?.text();
      return (
        (result != "null" &&
          result?.length &&
          result[0] !== "<" &&
          JSON.parse(result)) ||
        null
      );
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
