/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

const GET_USER = gql`
  query getUser {
    user {
      id
      email
      loggedIn
      alertEnabled
      role
      activeSubscription
      emailConfirmed
      apiUsage {
        usage
        lastScanDate
      }
    }
  }
`

export const updateUserCache = {
  update(cache: any, { data: { cachedUser } }: any) {
    const variables = {
      alertEnabled: cachedUser.alertEnabled,
    }
    const { user } = cache.readQuery({
      query: GET_USER,
      variables,
    })

    cache.writeQuery({
      query: GET_USER,
      variables,
      data: {
        user: {
          ...user,
        },
      },
    })
  },
}

export { GET_USER }
