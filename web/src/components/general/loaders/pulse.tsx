/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { pulseStyles } from '@app/styles'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  spinner: {
    width: '40px',
    height: '40px',
    position: 'relative',
  },
  bounce: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    opacity: 0.6,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
}))

function Pulse({
  classNames,
  visible,
  innerElement,
  backgroundColor,
  size,
}: any) {
  const classes = useStyles()
  const pulse = pulseStyles()

  return visible ? (
    <>
      <div
        className={`${classNames.spinner} ${classes.spinner}`}
        style={{ width: size, height: size }}
      >
        <div
          className={`${classNames.bounce1} ${classes.bounce} ${pulse.bounce}`}
          style={{ backgroundColor }}
        >
          {innerElement}
        </div>
        <div
          className={`${classNames.bounce1} ${classes.bounce} ${pulse.bounce} ${pulse.bounce2}`}
        />
      </div>
    </>
  ) : null
}

Pulse.defaultProps = {
  classNames: {
    spinner: '',
    bounce1: '',
    bounce2: '',
  },
  backgroundColor: '#000',
  size: 40,
  styles: {},
  visible: false,
  innerElement: '',
}

export { Pulse }
