/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import jwt from "jsonwebtoken"
import { PRIVATE_KEY, PUBLIC_KEY } from "@app/config"

const issuer = "AUTH/RESOURCE"
const expiresIn = "365 days"
const algorithm = "RS256"

const subject = "user@.com"
const audience = "http://adahelpalerts.com"
const keyid = ""

const signOptions = {
  issuer,
  subject,
  audience,
  expiresIn,
  algorithm,
  keyid
}

export function signJwt({ email, role, keyid }, options = {}) {
  return jwt.sign(
    {
      subject: email,
      // TODO: audience should be domain -> move role to another prop or combine with subject
      audience: role,
      keyid
    },
    String(PRIVATE_KEY).trim(),
    Object.assign({}, signOptions, options) as any
  )
}

export function verifyJwt(token, options = {}) {
  return jwt.verify(
    token,
    String(PUBLIC_KEY).trim(),
    Object.assign({}, signOptions, options, { algorithm: [algorithm] })
  )
}

export function decodeJwt(token) {
  return token && jwt.decode(token, { complete: true })
}
