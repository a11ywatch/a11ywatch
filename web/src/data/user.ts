/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { useMemo } from 'react'

import {
  UPDATE_USER,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  CONFIRM_EMAIL,
} from '@app/mutations'
import { GET_USER, updateCache } from '@app/queries'
import { AppManager, UserManager } from '@app/managers'
import { EMAIL_VERIFIED_SUBSCRIPTION } from '@app/subscriptions'

export const userData = (_?: any, config: any = { query: true }) => {
  const variables = {}
  const { data, loading } =
    config.query &&
    useQuery(GET_USER, {
      variables,
    })

  const [
    updateUser,
    { data: updateUserData, loading: updateUserLoading },
  ] = useMutation(UPDATE_USER, updateCache as any)

  const [
    forgotPassword,
    { data: forgotPasswordData, loading: forgotPasswordLoading },
  ] = useMutation(FORGOT_PASSWORD)

  const [
    resetPassword,
    { data: resetPasswordData, loading: resetPasswordLoading },
  ] = useMutation(RESET_PASSWORD)

  const [confirmEmail] = useMutation(CONFIRM_EMAIL)

  const sendConfirmEmail = () => {
    confirmEmail({
      variables,
    }).catch((e: any) => {
      console.log(e)
    })
    AppManager.toggleSnack(
      true,
      'Please check your email for confirmation link',
      'success'
    )
  }

  const { data: emailVerified } = useSubscription(EMAIL_VERIFIED_SUBSCRIPTION, {
    variables: { userId: UserManager.getID },
  })

  useMemo(() => {
    if (emailVerified) {
      console.log('sub email verified', emailVerified)
      if (data?.user) {
        data.user.emailConfirmed = true
      }
    }
  }, [emailVerified])

  const model = Object.freeze({
    data,
    forgotPasswordData,
    loading:
      loading ||
      updateUserLoading ||
      forgotPasswordLoading ||
      resetPasswordLoading,
    updateUser,
    updateUserData,
    forgotPassword,
    resetPassword,
    resetPasswordData,
    sendConfirmEmail,
  })

  return model
}
