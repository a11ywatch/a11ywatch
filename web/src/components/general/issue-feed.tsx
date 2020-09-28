/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useState } from 'react'
import { List, Button, Typography, IconButton, Fade } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { printElement } from '@app/utils'

import { useIssueFeed } from '@app/data'
import { issueSort } from '@app/lib'

import { issueFeedStyles as useStyles } from './styles'
import { WebsitePrimaryCell } from './cells'

const CTA_LIST_ID = 'cta-issue-list'

export function IssueFeed({
  renderListOnly = false,
  printable,
  website,
  checkList,
}: any) {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent } = useIssueFeed()
  const [checked, setChecked] = useState<any>([])

  const handleToggle = (value?: any) => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  const checkItemProps = checkList
    ? {
        handleToggle,
        checked,
        checkList,
      }
    : {}

  if (renderListOnly) {
    const issue =
      website?.issue || (website?.issues?.length && website?.issues[0]?.issues)

    if (!issue?.length) {
      return (
        <Typography variant='h5' component='p' className={classes.subTitle}>
          {'No issues found. Great work'}
        </Typography>
      )
    }

    return (
      <>
        <List
          className={`${classes.searchList} ${
            checkList ? classes.checklist : ''
          }`}
          id={CTA_LIST_ID}
        >
          {issue?.sort(issueSort).map((item: any, listIndex: number) => {
            return (
              <WebsitePrimaryCell
                key={`${listIndex} ${item?.selector} ${item?.code}`}
                item={item}
                url={issue?.pageUrl}
                error
                listIndex={listIndex}
                {...checkItemProps}
              />
            )
          })}
        </List>
        {printable ? (
          <Button
            className={classes.print}
            onClick={() => printElement(CTA_LIST_ID, website)}
          >
            Print Issues
          </Button>
        ) : null}
      </>
    )
  }

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
                          {...checkItemProps}
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
