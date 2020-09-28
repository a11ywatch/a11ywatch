/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { emailMessager } from "@app/core/messagers";
import { followUpEmail } from "@app/core/email-templates";
import { UsersController } from "./users";

export const usersEmail = async () => {
  const [users] = await UsersController().getAllUsers(true);

  for (const item of users) {
    const userId = item?.userId;
    const email = item?.email;
    const emailConfirmed = item?.emailConfirmed;

    if (email) {
      await emailMessager.sendFollowupEmail({
        emailConfirmed,
        userId,
        email,
        subject: "A11yWatch API now Open and Editable Custom Scripts",
        html: followUpEmail,
      });
    }
  }
};
