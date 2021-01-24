/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { UsersController } from "@app/core/controllers";

const confirmEmail = async (req, res) => {
  const code = String(req.query?.code || req.body?.code);
  const validEmail = await UsersController().validateEmail(
    {
      code,
    },
    false
  );

  res.send(
    validEmail
      ? "Success, email verified"
      : "Link expired, please get a new link and try again."
  );
};

const unSubEmails = async (req, res) => {
  try {
    const email = req?.query?.email + "";
    const id = Number(req?.query?.id);

    await UsersController().unsubscribeEmails({
      id,
      email,
    });
    res.json({
      sucess: "unsubscribed from email alerts",
    });
  } catch (e) {
    console.error(e);
    res.json({
      failed: "failed to unsubscribed from email alerts",
    });
  }
};

export { confirmEmail, unSubEmails };
