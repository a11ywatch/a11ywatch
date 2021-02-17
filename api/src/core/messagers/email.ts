/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { isSameDay } from "date-fns";
import { connect } from "@app/database";
import { logoSvg, footer } from "@app/html";
import { log } from "@a11ywatch/log";
import { transporter, mailOptions, realUser, sendMailCallback } from "../utils";
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
        await transporter.verify();
        await transporter.sendMail(
          Object.assign({}, mailOptions, {
            to: email,
            subject: subject,
            html: `${logoSvg}<br />${html}`,
          }),
          sendMailCallback
        );
      } catch (e) {
        log(e, { type: "error" });
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
    if (realUser(userId) && data?.issues?.length) {
      const [userCollection] = await connect("Users");
      const findUser = await userCollection.findOne({ id: userId });

      if (
        !findUser ||
        !findUser?.alertEnabled ||
        (confirmedOnly && !findUser?.emailConfirmed)
      ) {
        return null;
      }

      const currentDate = new Date();

      if (
        !findUser.lastAlertDateStamp ||
        !isSameDay(findUser?.lastAlertDateStamp, currentDate)
      ) {
        try {
          await userCollection.findOneAndUpdate(
            { id: userId },
            { $set: { lastAlertDateStamp: currentDate } }
          );

          await transporter.verify();
          await transporter.sendMail(
            Object.assign({}, mailOptions, {
              to: findUser.email,
              subject: `${data.issues.length} issues found with ${
                data?.pageUrl || data?.domain
              }.`,
              html: `${logoSvg}<br /><h1>${issuesFoundTemplate(
                data
              )}<br />${footer.marketing({
                userId,
                domain: data?.domain || data?.pageUrl,
              })}`,
            }),
            sendMailCallback
          );
        } catch (e) {
          log(e, { type: "error" });
        }
      }
    }
  },
};
