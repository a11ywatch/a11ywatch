/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FakeButtonContainer } from '@app/components/fake'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  centerAlign: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    ['& > img']: {
      textAlign: 'center',
      display: 'block',
      maxHeight: '38vh',
    },
  },
  container: {
    background: 'rgb(33,32,36)',
    overflow: 'hidden',
    maxWidth: '35vw',
    maxHeight: '60vh',
    minWidth: '20%',
  },
  screenshotContainer: {
    borderRadius: 4,
    overflowY: 'scroll',
    maxHeight: '60vh',
    marginLeft: '25vw',
    marginRight: '25vw',
  },
  resetMargin: {
    marginLeft: 'auto',
    marginRight: 'auto',
    ['& > img']: {
      maxHeight: '38vh',
    },
  },
  float: {
    float: 'right',
  },
  space: {
    marginRight: theme.spacing(2),
  },
}))

export function Screenshot({ src, url, resetMargin, width, height }: any) {
  const classes = useStyles()

  return (
    <div
      className={`${classes.container}${
        resetMargin ? ` ${classes.space}` : ''
      }`}
    >
      <FakeButtonContainer />
      <div
        className={`${classes.screenshotContainer}${
          resetMargin ? ` ${classes.resetMargin}` : ''
        }`}
      >
        <div className={resetMargin ? classes.float : classes.centerAlign}>
          <Image
            src={src}
            alt={`screenshot of ${url} tested`}
            width={width ?? 450}
            height={height ?? 500}
          />
        </div>
      </div>
    </div>
  )
}
