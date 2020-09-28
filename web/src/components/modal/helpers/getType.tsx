/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { EnableNotifications } from '@app/components/alerts'
import { WithHighlight } from '@app/components/adhoc'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    width: '75vw',
    height: '75vh',
    display: 'block',
  },
  code: {
    width: '100%',
    height: '100%',
    fontSize: 12,
    '&::-webkit-scrollbar': {
      background: '#424242',
      height: 7,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#1b1b1b',
      borderRadius: 0,
      border: 0,
    },
  },
}))

export const getType = ({ modalType, html }: any) => {
  switch (modalType) {
    case 0:
      return null
    case 1:
      return <EnableNotifications />
    case 2:
      const classes = useStyles()

      return (
        <div className={classes.container}>
          <WithHighlight className={classes.code}>{html}</WithHighlight>
        </div>
      )

    default:
      return null
  }
}
