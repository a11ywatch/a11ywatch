/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'

export const Timer = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  return <Typography gutterBottom>Scan time: {seconds}s</Typography>
}
