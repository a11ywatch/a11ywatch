/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { UsersController } from "../../core/controllers";

const confirmEmail = async (req, res) => {
  const code = String(req.query?.code || req.body?.code);
  console.log("CONFRIMING EMAIL:", code);
  const response = await UsersController().validateEmail(
    {
      code,
    },
    false
  );

  res.send(
    response
      ? "Success, email verified"
      : "Link expired, please get a new link and try again."
  );
};

export { confirmEmail };
