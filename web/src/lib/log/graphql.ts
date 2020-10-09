/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const logGraphErrors = (res: any) => {
  const errors = res?.graphQLErrors.map((error: any) => {
    return error?.message
  })
  console.error(errors)
}

export { logGraphErrors }
