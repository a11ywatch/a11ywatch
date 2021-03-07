/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { List, Typography, IconButton, Fade } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { useIssueFeed } from '@app/data'
import { issueSort } from '@app/lib'
import { issueFeedStyles as useStyles } from '../general/styles'
import { WebsitePrimaryCell } from '../general/cells'

export function IssueFeed() {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent } = useIssueFeed()

  return issueFeed?.data?.length && issueFeed.open ? (
    <Fade in>
      <div className={classes.root}>
        <div className={`${classes.row} ${classes.titleContainer}`}>
          <Typography variant='h6' component='p' className={classes.title}>
            Recent Issues
          </Typography>
          <IconButton
            edge='start'
            color='inherit'
            onClick={setIssueFeedContent(false, false)}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </div>
        {issueFeed?.data?.map((issue: any, issueIndex: number) => {
          return (
            <div key={`${issueIndex} ${issue?.pageUrl} ${issue?.domain}`}>
              <Typography
                variant='subtitle1'
                component='p'
                className={classes.subTitle}
              >
                {issue.pageUrl}
              </Typography>
              <List className={classes.list}>
                {issue?.issues
                  ?.sort(issueSort)
                  .map((item: any, listIndex: number) => {
                    return (
                      <li key={`${listIndex} ${item?.selector} ${item?.code}`}>
                        <WebsitePrimaryCell
                          issuesModal
                          error
                          item={item}
                          listIndex={listIndex}
                          url={issue?.pageUrl}
                        />
                      </li>
                    )
                  })}
              </List>
            </div>
          )
        })}
      </div>
    </Fade>
  ) : null
}
