/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'

import { List } from '@material-ui/core'

import { featuresData, userModel, useEvents } from '@app/data'
import { features } from '@app/configs'
import { FeaturesCell } from '../cells'

export function AuthedMenu({ route, isMobile, dataSourceMap }: any) {
  const { toggleAlert, toggleAlertData } = featuresData()
  const { events, setEvents } = useEvents()
  const enabledAlerts = userModel.alertEnabled({
    toggleCombiner: toggleAlertData?.toggleAlert?.alertEnabled,
    networkCombiner:
      !toggleAlertData?.toggleAlert && dataSourceMap?.user?.alertEnabled,
  })

  return (
    <List>
      {features.map(({ feature }: any, index: number) => (
        <li key={index}>
          <FeaturesCell
            alertEnabled={!!enabledAlerts}
            feature={feature}
            index={index}
            focused={route === feature}
            events={events}
            isMobile={isMobile}
            setEvents={setEvents}
            toggleAlert={() => {
              toggleAlert({
                variables: {
                  alertEnabled: !enabledAlerts,
                },
              })
            }}
          />
        </li>
      ))}
    </List>
  )
}
