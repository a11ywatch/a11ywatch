/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

const GET_PAYMENTS = gql`
  query getUser {
    user {
      id
      email
      loggedIn
      alertEnabled
      role
      activeSubscription
      paymentSubscription {
        id
        start_date
        status
        billing_cycle_anchor
        days_until_due
        current_period_end
        current_period_start
        created
        collection_method
        ended_at
        canceled_at
        plan {
          amount_decimal
          id
          object
          nickname
          currency
          interval
          amount
        }
      }
    }
  }
`

export { GET_PAYMENTS }
