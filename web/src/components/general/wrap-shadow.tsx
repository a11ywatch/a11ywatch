/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useScrollEvent } from 'use-scroll-event'

const useStyles = makeStyles((theme) => ({
  container: Object.assign({}, theme.mixins.toolbar, {
    width: '100%',
    position: 'fixed',
    top: 0,
    pointerEvents: 'none',
    zIndex: 1000,
  }),
  hideShadow: {
    boxShadow: 'none',
  },
  showShadow: {
    boxShadow: theme.shadows[4],
  },
}))

export function WrapShadow() {
  const { y } = useScrollEvent({ detectScrolling: false })
  const classes = useStyles()

  return (
    <div
      className={`${classes.container} ${
        y > 90 ? classes.showShadow : classes.hideShadow
      }`}
    />
  )
}
