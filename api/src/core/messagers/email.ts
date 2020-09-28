/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { isSameDay } from "date-fns";
import { connect } from "@app/database";
import { logoSvg, footer } from "@app/html";

import { transporter, mailOptions, realUser } from "../utils";
import { issuesFoundTemplate } from "../email-templates";

export const emailMessager = {
  sendFollowupEmail: async ({
    userId,
    email,
    emailConfirmed,
    subject = "",
    html,
  }: any) => {
    if (emailConfirmed && email && subject && html) {
      try {
        const mailconfig = Object.assign({}, mailOptions, {
          to: email,
          subject: subject,
          html: `${logoSvg}<br />${html}`,
        });

        await transporter.verify();
        const info = await transporter.sendMail(mailconfig);
        console.log("Email sent: " + info?.response);
      } catch (e) {
        console.log(e);
      }
    }
  },
  sendMail: async ({
    userId,
    data = {
      pageUrl: "",
      issues: [],
      domain: "",
    },
    confirmedOnly = false,
  }: any) => {
    if (realUser(userId)) {
      const [userCollection] = await connect("Users");
      const findUser = await userCollection.findOne({ id: userId });

      if (!findUser || (confirmedOnly && !findUser?.emailConfirmed)) {
        return null;
      }

      if (
        (data?.issues?.length &&
          findUser?.alertEnabled &&
          !findUser.lastAlertDateStamp) ||
        (findUser?.alertEnabled &&
          !isSameDay(findUser?.lastAlertDateStamp, new Date()))
      ) {
        try {
          await userCollection.findOneAndUpdate(
            { id: userId },
            { $set: { lastAlertDateStamp: new Date() } }
          );

          const mailconfig = Object.assign({}, mailOptions, {
            to: findUser.email,
            subject: `${data?.issues?.length} issues found with ${
              data?.pageUrl || data?.domain
            }.`,
            html: `${logoSvg}<br /><h1>${issuesFoundTemplate(
              data
            )}<br />${footer.marketing({
              userId,
              domain: data?.domain || data?.pageUrl,
            })}`,
          });

          await transporter.verify();
          const info = await transporter.sendMail(mailconfig);
          console.log("Email sent: " + info?.response);
        } catch (e) {
          console.error(e);
        }
      }
    }
  },
};
