/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'

export const Timer = ({ stop }: { stop?: boolean }) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
    }, 1000)
    if (stop) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [stop])

  return (
    <Typography
      gutterBottom
      variant={'subtitle1'}
      style={{
        color: seconds > 20 ? 'red' : seconds > 10 ? 'yellow' : 'inherit',
      }}
    >
      Scan time: {seconds}s
    </Typography>
  )
}
