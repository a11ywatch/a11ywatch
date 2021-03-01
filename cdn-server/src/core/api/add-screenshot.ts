/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { readFileSync, createWriteStream } from "fs";
import { log } from "@a11ywatch/log";
import { directoryExist, uploadToS3, AWS_S3_ENABLED } from "../../";

const createSS = async ({ srcPath, cdnFileName, screenshot }: any) => {
  const dirExist = directoryExist(srcPath);
  if (dirExist && screenshot) {
    const screenshotStream = createWriteStream(cdnFileName);

    screenshotStream.write(Buffer.from(screenshot));
    screenshotStream.on("finish", () => {
      log(`WROTE: ${cdnFileName}`);
      if (AWS_S3_ENABLED) {
        await uploadToS3(
          readFileSync(cdnFileName),
          `${srcPath.substring(4)}.png`,
          cdnFileName
        );
      }
    });
    screenshotStream.end();
  }
};

export const addScreenshot = async (req, res) => {
  const { cdnSourceStripped, domain, screenshot, screenshotStill } = req.body;
  const srcPath = `src/screenshots/${domain}/${cdnSourceStripped}`;
  const cdnFileName = srcPath + ".png";

  try {
    await Promise.all([
      createSS({
        cdnFileName,
        screenshot,
        srcPath,
      }),
      createSS({
        cdnFileName: cdnFileName.replace(".png", "-still.png"),
        screenshot: screenshotStill,
        srcPath: `${srcPath}-still`,
      }),
    ]);

    res.send(true);
  } catch (e) {
    console.error(e);
    res.send(false);
  }
};
