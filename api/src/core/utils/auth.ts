/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import fs from "fs";
import jwt from "jsonwebtoken";
import { config } from "@app/config";

let { PRIVATE_KEY, PUBLIC_KEY } = config;

try {
  if (!PRIVATE_KEY) {
    PRIVATE_KEY = fs.readFileSync("./private.key", "utf8");
  }
  if (!PUBLIC_KEY) {
    PUBLIC_KEY = fs.readFileSync("./public.key", "utf8");
  }
} catch (e) {
  console.error(e);
}

const issuer = "AUTH/RESOURCE";
const expiresIn = "365 days";
const algorithm = "RS256";

const subject = "user@.com";
const audience = "http://adahelpalerts.com";
const keyid = "";

const signOptions = {
  issuer,
  subject,
  audience,
  expiresIn,
  algorithm,
  keyid,
};

export function signJwt({ email, role, keyid }, options = {}) {
  return jwt.sign(
    {
      subject: email,
      // TODO: audience should be domain -> move role to another prop or combine with subject
      audience: role,
      keyid,
    },
    PRIVATE_KEY,
    Object.assign({}, signOptions, options)
  );
}

export function verifyJwt(token, options = {}) {
  return jwt.verify(
    token,
    PUBLIC_KEY,
    Object.assign({}, signOptions, options, { algorithm: [algorithm] })
  );
}

export function decodeJwt(token) {
  return token && jwt.decode(token, { complete: true });
}
