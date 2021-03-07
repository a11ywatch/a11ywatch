/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { readFileSync, createWriteStream } from "fs";
import { log } from "@a11ywatch/log";
import { directoryExist, uploadToS3, AWS_S3_ENABLED } from "../../";

const createSS = ({ srcPath, cdnFileName, screenshot }: any): any => {
  try {
    if (screenshot && directoryExist(srcPath)) {
      const screenshotStream = createWriteStream(cdnFileName);
      screenshotStream.write(Buffer.from(screenshot));

      screenshotStream.on("finish", () => {
        log(`WROTE: ${cdnFileName}`);
        if (AWS_S3_ENABLED) {
          uploadToS3(
            readFileSync(cdnFileName),
            `${srcPath.substring(4)}.png`,
            cdnFileName
          );
        }
      });
      screenshotStream.end();
    }
  } catch (e) {
    log(e, { type: "error" });
  }
};

export const addScreenshot = (req, res) => {
  const { cdnSourceStripped, domain, screenshot, screenshotStill } = req.body;
  const srcPath = `src/screenshots/${domain}/${cdnSourceStripped}`;
  const cdnFileName = srcPath + ".png";

  try {
    createSS({
      cdnFileName,
      screenshot,
      srcPath,
    });
    createSS({
      cdnFileName: cdnFileName.replace(".png", "-still.png"),
      screenshot: screenshotStill,
      srcPath: `${srcPath}-still`,
    });

    res.send(true);
  } catch (e) {
    log(e, { type: "error" });
    res.send(false);
  }
};
