/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createTransport } from "nodemailer";
import { config } from "@app/config";

const { EMAIL_SERVICE_URL, EMAIL_CLIENT_ID, EMAIL_CLIENT_KEY } = config;

let transporter: any = {
  verify: () => {},
  sendMail: () => {},
};

if (EMAIL_CLIENT_KEY && EMAIL_CLIENT_ID && EMAIL_SERVICE_URL) {
  try {
    transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: EMAIL_SERVICE_URL,
        serviceClient: String(EMAIL_CLIENT_ID),
        privateKey: String(EMAIL_CLIENT_KEY),
      },
    });
  } catch (e) {
    console.error("Email transport creation failed", e);
  }
}

const mailOptions = {
  from: `"${String(EMAIL_SERVICE_URL).replace(
    "www.",
    ""
  )} Support" <${EMAIL_SERVICE_URL}>`,
  to: "myfriend@yahoo.com",
  subject: "Issues found",
  text: "Some issues where found on your website.",
};

const sendMailCallback = (er: any, info: any, cb?: () => any) => {
  if (er) {
    console.error(er);
  } else {
    console.log("Email sent: " + info?.response);
  }
  cb && cb();
};

export { transporter, mailOptions, sendMailCallback };
