/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { readFileSync, createWriteStream } from "fs";
import { directoryExist, uploadToS3, AWS_S3_ENABLED } from "../../";

const createSS = ({ srcPath, awsSSPath, cdnFileName, screenshot }: any) => {
  const dirExist = directoryExist(srcPath);

  if (dirExist) {
    const screenshotStream = createWriteStream(cdnFileName);

    screenshotStream.write(Buffer.from(screenshot));
    screenshotStream.on("finish", () => {
      console.log(`COMPLETED WRITE: SS FILE: ${cdnFileName}`);
      if (AWS_S3_ENABLED) {
        uploadToS3(readFileSync(cdnFileName), `${awsSSPath}.png`, cdnFileName);
      }
    });
    screenshotStream.end();
  }
};

export const addScreenshot = (req, res) => {
  const { cdnSourceStripped, domain, screenshot, screenshotStill } = req.body;
  try {
    const srcPath = `src/screenshots/${domain}/${cdnSourceStripped}`;
    const awsPath = srcPath.substring(4);
    const cdnFileName = srcPath + ".png";

    createSS({
      cdnFileName,
      screenshot,
      awsPath,
      srcPath,
    });
    createSS({
      cdnFileName: cdnFileName.replace(".png", "-still.png"),
      screenshot: screenshotStill,
      awsSSPath: `${awsPath}-still`,
      srcPath: `${srcPath}-still`,
    });

    res.send(true);
  } catch (e) {
    console.error(e);
    res.send(false);
  }
};
