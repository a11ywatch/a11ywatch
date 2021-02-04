/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function userParams({
  id,
  email,
  emailConfirmCode,
}: {
  id?: any;
  email?: string;
  emailConfirmCode?: string;
}) {
  let searchProps = {};

  if (email) {
    searchProps = { email };
  }

  if (typeof id !== "undefined") {
    searchProps = { ...searchProps, id };
  }

  if (emailConfirmCode) {
    searchProps = { ...searchProps, emailConfirmCode };
  }

  return searchProps;
}
