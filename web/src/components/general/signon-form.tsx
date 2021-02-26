/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useRef, useCallback, useMemo, FunctionComponent } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useRouter } from 'next/router'

import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  FormHelperText,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER, LOGIN } from '@app/mutations'
import { AppManager, UserManager } from '@app/managers'
import { userModel } from '@app/data'
import { GOOGLE_CLIENT_ID } from '@app/configs'
import { GoogleIcon } from '@app/components/badges'
import { Link } from './link'
import { LinearBottom } from './loaders'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '12%',
    paddingBottom: '12%',
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
    fontWeight: 'bold',
    marginLeft: 6,
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

interface SignOnProps {
  loginView?: boolean
  home?: boolean
}

const SignOnForm: FunctionComponent<SignOnProps> = ({ loginView, home }) => {
  const router = useRouter()
  const classes = useStyles()
  const [signOnMutation, { data, error, loading }] = useMutation(
    loginView ? LOGIN : REGISTER
  )
  const emailRef = useRef<any>(null)
  const passwordRef = useRef<any>(null)

  useMemo(() => {
    if (data) {
      const user = data[loginView ? 'login' : 'register']
      if (user) {
        userModel.logIn(user)
        UserManager.setUser(user)
        router.push('/dashboard')
      }
    }
  }, [data])

  useMemo(() => {
    if (error?.graphQLErrors?.length) {
      AppManager.toggleSnack(true, error?.graphQLErrors, 'error')
    }
  }, [error])

  const submit = useCallback(async (e: any) => {
    e?.preventDefault()
    // @ts-ignore
    if (!passwordRef?.current?.value || !emailRef?.current?.value) {
      AppManager.toggleSnack(
        true,
        !emailRef?.current?.value
          ? 'Please enter a password of at least 6 characters.'
          : 'Please check your email and password and try again.',
        'error'
      )
    } else {
      try {
        await signOnMutation({
          variables: {
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
          },
        })
      } catch (e) {
        console.error(e)
      }

      // @ts-ignore
      if (passwordRef.current) {
        passwordRef.current.value = ''
      }
    }
  }, [])

  return (
    <>
      <Container maxWidth='sm' className={classes.root}>
        <Typography
          variant={home ? 'h4' : 'h2'}
          component={home ? 'h5' : 'h1'}
          gutterBottom
          align='center'
        >
          {(loginView && 'Login') || (home && 'Sign up for free') || 'Register'}
        </Typography>
        <div className={classes.paper}>
          {GOOGLE_CLIENT_ID ? (
            <>
              <GoogleLogin
                clientId={String(GOOGLE_CLIENT_ID)}
                buttonText={loginView ? 'Login' : 'Sign up with google'}
                onSuccess={async (response: any) => {
                  try {
                    await signOnMutation({
                      variables: {
                        email: response?.profileObj?.email,
                        password: '',
                        googleId: response?.googleId,
                      },
                    })
                  } catch (e) {
                    console.error(e)
                  }
                }}
                onFailure={(err) => {
                  console.error(err)
                }}
                cookiePolicy={'single_host_origin'}
                render={(renderProps: any) => (
                  <Button
                    onClick={renderProps.onClick}
                    className={classes.google}
                    disabled={renderProps.disabled}
                    variant='text'
                    size='small'
                    startIcon={
                      <GoogleIcon className={classes.iconColor} src={''} />
                    }
                  >
                    {loginView ? 'Login' : 'Sign up with google'}
                  </Button>
                )}
              />
              <Typography
                variant='overline'
                component='p'
                className={classes.or}
              >
                Or
              </Typography>
            </>
          ) : null}
          <form autoComplete={loginView ? 'on' : 'off'} onSubmit={submit}>
            <div>
              <FormControl>
                <TextField
                  id='email'
                  aria-describedby='my-email-text'
                  className={classes.textField}
                  label='Email'
                  type='email'
                  margin='dense'
                  autoFocus={!home}
                  autoComplete='email'
                  variant='outlined'
                  required
                  inputRef={emailRef}
                />
                <FormHelperText
                  id='my-email-text'
                  className={classes.textCenter}
                >
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
                  type='password'
                  autoComplete='current-password'
                  variant='outlined'
                  required
                  inputRef={passwordRef}
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
            <Button className={classes.submit} type='submit'>
              {loginView ? 'Login' : 'Sign up with email'}
            </Button>
          </form>
          {home ? (
            <span className={classes.row}>
              <Typography variant='overline' component='span'>
                Already have an account?
                <Link href='/login' className={classes.loginLink}>
                  Log in
                </Link>
              </Typography>
            </span>
          ) : null}
          {!home ? (
            <span className={classes.row}>
              <Typography variant='overline' component='p'>
                Forgot Password?{' '}
                <Link href='/reset-password' className={classes.loginLink}>
                  Reset
                </Link>
              </Typography>
            </span>
          ) : null}
        </div>
      </Container>
      <LinearBottom loading={loading} />
    </>
  )
}

export { SignOnForm }
