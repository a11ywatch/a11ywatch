/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createTransport } from "nodemailer";
import { config } from "@app/config";

const { EMAIL_SERVICE_URL, EMAIL_CLIENT_ID, EMAIL_CLIENT_KEY } = config;

// TODO: ADD PROPER TYPES
let transporter: any;

if (EMAIL_CLIENT_KEY && EMAIL_CLIENT_ID) {
  transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: EMAIL_SERVICE_URL,
      serviceClient: String(EMAIL_CLIENT_ID),
      privateKey: String(EMAIL_CLIENT_KEY).replace(/\\n/gm, "\n"),
    },
  });
}

const mailOptions = {
  from: `"${String(EMAIL_SERVICE_URL).replace(
    "www.",
    ""
  )} Support" <${EMAIL_SERVICE_URL}>`,
  to: "myfriend@yahoo.com", // <-- make sure update with email in options
  subject: "Issues found",
  text: "Some issues where found on your website.",
};

export { transporter, mailOptions };
