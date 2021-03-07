/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { dev } from '@app/configs'
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
    maxHeight: '60vh',
    minWidth: '33%',
    borderRadius: 4,
  },
  screenshotContainer: {
    overflowY: 'scroll',
    maxHeight: 'inherit',
  },
  resetMargin: {
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowY: 'hidden',
  },
  float: {
    float: 'left',
  },
  space: {
    marginRight: theme.spacing(2),
    marginLeft: '0px',
  },
}))

export function Screenshot({ src, url, resetMargin, width, height }: any) {
  const classes = useStyles()
  const ImageComponent = !resetMargin && dev ? 'img' : Image

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
          <ImageComponent
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
