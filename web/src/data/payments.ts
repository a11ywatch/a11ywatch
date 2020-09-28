/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ADD_PAYMENT_SUBSCRIPTION, CANCEL_SUBSCRIPTION } from '@app/mutations'
import { GET_PAYMENTS, updateCache } from '@app/queries'
import { UserManager } from '@app/managers'

export const paymentsData = () => {
  const { data, loading } = useQuery(GET_PAYMENTS, {
    variables: {},
  })

  const [
    addSubscription,
    { data: updateUserData, loading: addPaymentLoading },
  ] = useMutation(ADD_PAYMENT_SUBSCRIPTION, updateCache as any)

  const [
    cancelSubscription,
    { loading: cancelSubscriptionLoading },
  ] = useMutation(CANCEL_SUBSCRIPTION)

  const user = data?.user || {}
  const newUser = updateUserData?.updateUserData?.user || {}
  const userData = Object.assign({}, user, newUser)

  useMemo(() => {
    if (newUser?.role !== user?.role && newUser?.jwt) {
      UserManager.setJwt(newUser.jwt)
    }
  }, [newUser])

  const model = Object.freeze({
    data: (Object.keys(userData).length > 0 && userData) || null,
    loading: loading || addPaymentLoading || cancelSubscriptionLoading,
    addSubscription,
    cancelSubscription,
  })

  return model
}
