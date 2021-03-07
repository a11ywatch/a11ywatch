/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment } from 'react'
import { List, Button, Typography } from '@material-ui/core'
import { printElement } from '@app/utils'
import { issueSort } from '@app/lib'
import { issueFeedStyles as useStyles } from './styles'
import { RenderIssuesList } from './cells'

export function IssueList({ printable, website, className = '' }: any) {
  const classes = useStyles()
  const CTA_LIST_ID = 'cta-issue-list'

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
    <Fragment>
      <List
        className={`${classes.searchList} ${className ?? ''}`}
        id={CTA_LIST_ID}
      >
        {issue?.sort(issueSort).map((item: any, listIndex: number) => (
          <RenderIssuesList
            item={item}
            url={issue?.pageUrl}
            listIndex={listIndex}
            error
            key={`${listIndex} ${item?.selector} ${item?.code}`}
          />
        ))}
      </List>
      {printable ? (
        <Button
          className={classes.print}
          onClick={() => printElement(CTA_LIST_ID, website)}
        >
          Print Issues
        </Button>
      ) : null}
    </Fragment>
  )
}
