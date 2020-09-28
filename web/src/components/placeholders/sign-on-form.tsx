/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import {
  Container,
  Button,
  TextField,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TextSkeleton as Typography } from './text'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '7%',
    paddingBottom: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  submit: {
    marginTop: 10,
    width: 200,
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    display: 'inline-flex',
  },
  loginLink: {
    fontWeight: 'bolder',
    marginLeft: 6,
    color: '#fff',
  },
  or: {
    marginTop: 7,
  },
  google: {
    width: 200,
    minHeight: 40,
  },
  iconColor: {
    color: theme.palette.secondary.main,
  },
}))

export function SignOnFormSkeleton({
  loginView,
  home,
}: {
  loginView?: boolean
  home?: boolean
}) {
  const classes = useStyles()

  return (
    <Container maxWidth='sm' className={classes.root}>
      <Typography width={'20%'} height={'10%'} style={{ marginBottom: 20 }} />
      <div className={classes.paper}>
        <Button
          className={classes.google}
          variant='text'
          size='small'
          startIcon={<Skeleton className={classes.iconColor} />}
        >
          {loginView ? 'Login' : 'Sign up with google'}
        </Button>
        <div>
          <div>
            <FormControl>
              <TextField
                id='email'
                aria-describedby='my-email-text'
                className={classes.textField}
                label='Email'
                type='email'
                margin='dense'
                autoFocus={false}
                autoComplete='email'
                variant='outlined'
                required
              />
              <FormHelperText id='my-email-text' className={classes.textCenter}>
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                id='password'
                aria-describedby='my-password-text'
                className={`${classes.textField}`}
                label='Password'
                margin='dense'
                inputProps={{
                  minLength: '6',
                }}
                autoFocus={false}
                type='password'
                autoComplete='current-password'
                variant='outlined'
                required
              />
              <FormHelperText
                id='my-password-text'
                className={classes.textCenter}
                style={{ marginBottom: 0 }}
              >
                We'll never share your password.
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        {home ? (
          <span className={classes.row}>
            <Typography />
          </span>
        ) : null}
      </div>
    </Container>
  )
}
