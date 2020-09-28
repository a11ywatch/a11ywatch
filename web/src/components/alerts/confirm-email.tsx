/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Mail as MailIcon } from '@material-ui/icons'

const useStyles = makeStyles(({ palette, spacing, mixins }: Theme) =>
  createStyles({
    sticky: {
      border: `2px solid ${palette.primary.main}`,
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      padding: 12,
      marginTop: mixins.toolbar.minHeight,
      marginLeft: spacing(3),
      marginRight: spacing(3),
    },
    text: {
      fontWeight: 'bold',
      marginRight: 12,
      color: palette.text.secondary,
    },
    btn: {
      color: palette.text.secondary,
      background: palette.secondary.main,
      minWidth: 'auto',
    },
  })
)

interface Props {
  sendEmail(): any
}

function ConfirmEmail({ sendEmail }: Props) {
  const classes = useStyles()

  return (
    <div className={classes.sticky}>
      <Typography variant={'subtitle1'} className={classes.text}>
        Please confirm your email to enable alerts and much more
      </Typography>
      <Button
        onClick={sendEmail}
        variant={'contained'}
        className={classes.btn}
        startIcon={<MailIcon />}
      >
        Resend
      </Button>
    </div>
  )
}

export { ConfirmEmail }
