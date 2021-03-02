/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CtaInput } from './searchbar'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '12%',
    display: 'block',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '18%',
    },
  },
  detailedContainer: {
    paddingTop: '6%',
  },
}))

function CtaIntro({ checker }: any) {
  const classes = useStyles()

  return (
    <section
      className={`${classes.root}${
        checker ? ` ${classes.detailedContainer}` : ''
      }`}
    >
      <Typography variant='h2' component={'h1'}>
        Monitor web accessibility
      </Typography>
      <Typography variant='subtitle1' component={'p'} gutterBottom>
        Safeguard to a pleasant web experience
      </Typography>
      <CtaInput />
    </section>
  )
}

export { CtaIntro }
