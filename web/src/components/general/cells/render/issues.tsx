/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'

import { ListItem, ListItemIcon, Typography, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { WithHighlight } from '@app/components/adhoc'

const useStyles = makeStyles((theme) => ({
  mainItemContainer: {
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  list: {
    maxHeight: '50vh',
  },
  mainTitle: {
    fontSize: '16px',
    maxWidth: '88vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 500,
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '75vw',
    },
  },
  mainSubtitle: {
    fontSize: '13px',
    marginBottom: '2px',
    maxWidth: '88vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 400,
  },
  normalContentColor: {
    color: 'rgb(209,156,102)',
  },
  blockColor: {
    color: 'rgb(202,109,102)',
  },
  error: {
    background: 'rgba(239,83,80, 0.1)',
  },
  notice: {
    background: 'rgba(189,189,189, 0.1)',
  },
  warning: {
    background: 'rgba(255,238,88, 0.1)',
  },
}))

export function RenderIssue({
  message,
  code,
  context,
  type,
  selector,
  checkList,
  checked,
  handleToggle,
  listIndex,
}: any) {
  const classes = useStyles()
  const labelId = `checkbox-list-label-${listIndex}`
  const checkListProps = checkList
    ? {
        role: undefined,
        dense: true,
        component: 'button',
        onClick: () => handleToggle(listIndex),
      }
    : {}

  return (
    <ListItem
      divider={true}
      // @ts-ignore
      className={`${classes[type] ? classes[type] : ''}`}
      {...checkListProps}
    >
      {checkList ? (
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={checked.indexOf(listIndex) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
      ) : null}
      <div className={classes.mainItemContainer}>
        <div>
          <Typography
            variant='subtitle1'
            className={`${classes.mainTitle} ${classes.normalContentColor}`}
          >
            {selector}
          </Typography>
          <Typography variant='subtitle2' className={classes.mainSubtitle}>
            {code}
          </Typography>
        </div>
        <Typography variant='body1' gutterBottom>
          {message}
        </Typography>
        <WithHighlight>{String(context)}</WithHighlight>
      </div>
    </ListItem>
  )
}
