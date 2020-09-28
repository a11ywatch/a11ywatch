/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Button } from 'ui'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '-3rem',
    left: '15%',
    '&:focus': {
      top: 12,
      zIndex: 99999,
    },
    '&:hover': {
      // @ts-ignore
      color: theme.color.primary,
    },
  },
}))

export const SkipContent = () => {
  const classes = useStyles()

  return (
    <Button
      ariaLabel='Skip navigation'
      className={`${classes.root} invisible md:visible`}
      onClick={() => {
        document
          ?.querySelector('main')
          ?.querySelector('button, a, input, select, textarea')
          // @ts-ignore
          ?.focus()
      }}
    >
      SKIP NAVIGATION
    </Button>
  )
}
