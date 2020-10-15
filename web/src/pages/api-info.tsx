/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useState, useCallback } from 'react'
import { Container, Typography, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CopyIcon from '@material-ui/icons/FileCopy'
import { API_ENDPOINT } from '@app/configs'
import { NavBar, PageTitle, Box } from '@app/components/general'
import { TextSkeleton } from '@app/components/placeholders'
import { AppManager, UserManager } from '@app/managers'
import { userData } from '@app/data'
import { strings } from '@app-strings'
import { withApollo } from '@app/apollo'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  payments: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  email: {
    marginBottom: theme.spacing(2),
  },
  bold: {
    fontWeight: 600,
  },
  italic: {
    fontStyle: 'italic',
  },
  token: {
    background: 'transparent',
  },
  apiContainer: {
    overflow: 'hidden',
    height: 'auto',
  },
  passwordTitle: {
    marginRight: theme.spacing(2),
  },
  input: {
    background: 'transparent',
    color: theme.palette.text.primary,
    textDecoration: 'underline',
  },
  smallInput: {
    width: 70,
  },
  jwt: {
    maxWidth: '50vw',
    textAlign: 'left',
  },
}))

function ApiInfo() {
  const classes = useStyles()
  const { data = {}, loading } = userData()
  const [keyVisible, setKey] = useState(false)
  const { user } = data

  const copyText = useCallback(
    (mav: boolean) => (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
      e.preventDefault()
      const textString = `${API_ENDPOINT}/${
        !mav
          ? `website-check?url=www.example.com&jwt=${UserManager?.token}`
          : 'getImage'
      }`
      navigator.clipboard.writeText(textString)
      AppManager.toggleSnack(true, `Copied: ${textString}`, 'success')
    },
    []
  )

  const toggleKey = useCallback(() => {
    setKey(!keyVisible)
  }, [])

  return (
    <>
      <NavBar backButton title={'API'} notitle />
      <Container maxWidth='xl' className={classes.root}>
        <Box>
          <PageTitle title={`API`} />
          <Typography variant='subtitle1' component='p'>
            Add authorization header with the jwt format <i>Bearer TOKEN</i>
          </Typography>
          {!data?.user && loading ? (
            <TextSkeleton className={classes.email} />
          ) : (
            <>
              <Button
                className={classes.payments}
                type='button'
                onClick={toggleKey}
                variant='outlined'
              >
                {keyVisible ? 'HIDE TOKEN' : 'VIEW TOKEN'}
              </Button>
              {keyVisible ? (
                <div className={`${classes.container} ${classes.apiContainer}`}>
                  <Typography className={classes.token}>
                    {UserManager?.token}
                  </Typography>
                </div>
              ) : null}
            </>
          )}
          <Typography variant='subtitle1' component='p'>
            Daily Allowed Usage
          </Typography>
          {!data?.user && loading ? (
            <TextSkeleton className={classes.email} />
          ) : (
            <Typography
              variant='subtitle2'
              component='p'
              className={classes.email}
            >
              {user.apiUsage?.usage || 0}/
              {user.role === 0 ? 3 : user.role === 1 ? 25 : 100}
            </Typography>
          )}
          <Typography variant='subtitle1' component='p'>
            Endpoints
          </Typography>
          {!data?.user && loading ? (
            <TextSkeleton className={classes.email} />
          ) : (
            <>
              <Typography variant='subtitle2' component='p'>
                Page Issues : GET/POST
              </Typography>
              <div className={classes.row}>
                <IconButton
                  style={{ marginRight: 12 }}
                  onClick={copyText(false)}
                >
                  <CopyIcon />
                </IconButton>
                <Typography variant='subtitle1' component='p'>
                  {`${API_ENDPOINT}/website-check?url=http://example.com`}
                </Typography>
              </div>
              <Typography
                variant='body2'
                component='p'
                gutterBottom
                className={classes.bold}
              >
                {`Params: { url: String }`}
                {` Body: { url: String }`}
              </Typography>
              <Typography variant='subtitle2' component='p'>
                Image Name : POST
              </Typography>
              <div className={classes.row}>
                <IconButton
                  style={{ marginRight: 12 }}
                  onClick={copyText(true)}
                >
                  <CopyIcon />
                </IconButton>
                <Typography variant='subtitle1' component='p'>
                  {`${API_ENDPOINT}/getImage`}
                </Typography>
              </div>
              <Typography
                variant='body2'
                component='p'
                gutterBottom
                className={classes.bold}
              >
                {`Body: { imageBase64: Base64 }`}
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </>
  )
}

ApiInfo.meta = {
  title: `${strings.appName} - API`,
}

export default withApollo(ApiInfo)
