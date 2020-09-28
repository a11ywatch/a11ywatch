/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { userModel } from '@app/data'
import { TOGGLE_ALERT } from '@app/mutations'
import { useMutation } from '@apollo/react-hooks'

export const featuresData = () => {
  // const { data, loading } = config.query && useQuery(GET_FEATURES)
  const [
    toggleAlert,
    { data: toggleAlertData, loading: toggleAlertLoading },
  ] = useMutation(TOGGLE_ALERT)

  const model = Object.freeze({
    // data,
    // loading,
    toggleAlertLoading,
    toggleAlert: (alertParams?: any) => {
      if (alertParams?.variables) {
        toggleAlert(alertParams)
        userModel.toggleAlert(alertParams.variables.alertEnabled)
      }
    },
    toggleAlertData,
  })

  return model
}
