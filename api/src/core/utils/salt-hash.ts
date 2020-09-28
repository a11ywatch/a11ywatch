/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { randomBytes, createHmac } from "crypto";

function genRandomString(length: number) {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

function sha512(password, salt) {
  const hash = createHmac("sha512", salt);
  hash.update(password);
  return {
    salt,
    passwordHash: hash.digest("hex"),
  };
}

interface HashType {
  passwordHash?: string;
  salt?: string;
}

export function saltHashPassword(
  userpassword: string,
  saltIncluded?: boolean
): HashType {
  const salt = saltIncluded || genRandomString(16);
  return sha512(userpassword, salt);
}
