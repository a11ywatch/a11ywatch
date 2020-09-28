/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createReadStream, createWriteStream } from "fs";
import { minify } from "uglify-js";
import { directoryExist, uploadToS3, AWS_S3_ENABLED } from "../../lib";

export const addScript = (req, res) => {
  try {
    const { scriptBuffer, cdnSourceStripped, domain } = req.body;

    if (cdnSourceStripped && scriptBuffer) {
      const srcPath = `src/scripts/${domain}/${cdnSourceStripped}`;
      const awsPath = srcPath.substring(4);
      const cdnFileName = `${srcPath}.js`;
      const cdnFileNameMin = `${srcPath}.min.js`;
      const dirExist = directoryExist(cdnFileName);

      if (dirExist) {
        const writeStream = createWriteStream(cdnFileName);
        const writeStreamMinified = createWriteStream(cdnFileNameMin);
        const newScriptBuffer = Buffer.from(scriptBuffer);
        const minifiedCode = minify(scriptBuffer)?.code;
        const minBuffer = Buffer.from(minifiedCode);

        writeStream.write(newScriptBuffer, "base64");
        writeStreamMinified.write(minBuffer, "base64");

        writeStream.on("finish", () => {
          console.log(`COMPLETED WRITE: CDN FILE: ${cdnFileName}`);
          if (AWS_S3_ENABLED) {
            uploadToS3(
              createReadStream(cdnFileName),
              `${awsPath}.js`,
              cdnFileName
            );
          }
        });

        writeStreamMinified.on("finish", () => {
          console.log(`COMPLETED WRITE: Minified CDN FILE: ${cdnFileNameMin}`);
          if (AWS_S3_ENABLED) {
            uploadToS3(
              createReadStream(cdnFileNameMin),
              `${awsPath}.min.js`,
              cdnFileNameMin
            );
          }
        });

        writeStream.end();
        writeStreamMinified.end();
      }
    }

    res.send(true);
  } catch (e) {
    console.error(e);
    res.send(false);
  }
};
