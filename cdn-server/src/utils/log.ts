/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { request } from "http";

const options = {
  method: "POST",
  hostname: process.env.LOGGER_URL ?? "logger",
  port: 8022,
  path: "/api/log/",
  headers: {
    "Content-Type": "application/json",
  },
  maxRedirects: 5,
};

type LogInput = {
  container?: string;
  type?: string;
  platform?: string;
};

const log = (
  message: string = "",
  { platform = "node", type = "info", container = "cdn-server" }: LogInput = {}
) => {
  if (!process.env.LOGGER_ENABLED) {
    console[typeof console[type] === "function" ? type : "log"](message);
    return;
  }
  const data = JSON.stringify({
    message,
    platform,
    type,
    container,
  });

  try {
    const req = request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });

      res.on("error", function (error) {
        console.error(error);
      });
    });

    req.write(data);
    req.end();
  } catch (e) {
    console.error(e);
  }
};

export { log };
