/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  shape: {
    position: 'absolute',
    pointerEvents: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  oval1: {
    display: 'inline',
    top: 360,
    left: 0,
  },
  oval2: {
    right: 220,
    top: -300,
    height: 'auto',
    zIndex: 2,
  },
}))

function MarketingShapesTop() {
  const classes = useStyles()

  return (
    <Fragment>
      <span className={`${classes.shape} ${classes.oval1}`}>
        <Image src={'/static/img/shapes/oval-1.svg'} height={241} width={230} />
      </span>
      <span className={`${classes.shape} ${classes.oval2}`}>
        <Image src={'/static/img/shapes/oval-2.svg'} height={909} width={721} />
      </span>
    </Fragment>
  )
}

export { MarketingShapesTop }
