/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

const EMAIL_VERIFIED_SUBSCRIPTION = gql`
  subscription emailVerified($userId: Int) {
    emailVerified(userId: $userId) {
      emailConfirmed
    }
  }
`

export { EMAIL_VERIFIED_SUBSCRIPTION }
