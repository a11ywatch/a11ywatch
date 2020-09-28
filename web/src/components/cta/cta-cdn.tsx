/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { Link } from '@app/components/general'
import { userModel } from '@app/data'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tryOut: {
      marginLeft: '3px',
      marginRight: '5px',
    },
    row: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
    },
    register: {
      background: theme.palette.text.primary,
    },
    text: {
      fontWeight: 'bold',
      marginRight: '12px',
    },
    limited: {
      padding: theme.spacing(1),
      borderRadius: '3px',
      border: `2px solid ${theme.palette.primary.main}`,
      marginTop: theme.spacing(1),
    },
  })
)

function CtaCdn({ website, block }: any) {
  const classes = useStyles()
  const hasWebsite = website?.issues?.length
  // const cdnPath = `${SCRIPTS_CDN_URL_HOST}/${website?.cdn}`

  const possibleIssuesFixedByCdn = website?.issuesInfo?.possibleIssuesFixedByCdn
  const totalIssuesOnPage = website?.issuesInfo?.totalIssues
  // const issuesFixedByCdn = website?.issuesInfo?.issuesFixedByCdn
  const shouldBlock = block && !userModel?.jwt

  const limitedResonse = `This is a limited API response showing ${website?.issuesInfo?.limitedCount}/${totalIssuesOnPage} issues for the current page`

  const cdnTitle = shouldBlock
    ? `Login to fix ${possibleIssuesFixedByCdn} out of ${totalIssuesOnPage} issues instantly with a custom secure cdn for the current page for free`
    : `Fix ${possibleIssuesFixedByCdn} out of ${totalIssuesOnPage} issues instantly ${strings.tryOutCdn} `

  const moreInfo = shouldBlock
    ? `Get all your pages issues at once and more after signing in. `
    : ``

  return (
    <>
      <span className={classes.row} style={{ marginTop: 12 }}>
        <Typography
          component='span'
          className={classes.tryOut}
          variant={'subtitle1'}
        >
          {cdnTitle}
        </Typography>
      </span>
      {moreInfo ? (
        <Typography
          component='span'
          className={classes.tryOut}
          variant={'subtitle2'}
        >
          {moreInfo}
        </Typography>
      ) : null}
      {limitedResonse ? (
        <div className={classes.limited}>
          <Typography variant={'subtitle2'}>{limitedResonse}</Typography>
        </div>
      ) : null}
      <span className={classes.row} style={{ marginTop: 12 }}>
        <Button
          component={Link}
          href={'/login'}
          color={'secondary'}
          variant={'contained'}
          className={classes.text}
        >
          Login
        </Button>
        <Button
          component={Link}
          href={'/register'}
          color={'secondary'}
          variant={'outlined'}
          className={`${classes.register} ${classes.text}`}
        >
          Register
        </Button>
      </span>
      {hasWebsite === 0 ? (
        <Typography>No issues found, great job!</Typography>
      ) : null}
    </>
  )
}

export { CtaCdn }
