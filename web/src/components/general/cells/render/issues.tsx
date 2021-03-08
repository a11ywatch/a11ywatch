/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { ListItem, ListItemIcon, Typography, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { WithHighlight } from '@app/components/adhoc'

const useStyles = makeStyles(() => ({
  mainItemContainer: {
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  list: {
    maxHeight: '50vh',
  },
  mainSubtitle: {
    fontSize: '13px',
    marginBottom: '2px',
    maxWidth: '88vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 400,
  },
  blockColor: {
    color: 'rgb(202,109,102)',
  },
  error: {
    background: 'rgba(239,83,80, 0.06)',
  },
  notice: {
    background: 'rgba(189,189,189, 0.06)',
  },
  warning: {
    background: 'rgba(255,238,88, 0.06)',
  },
}))

export function RenderIssue({
  message,
  code,
  context,
  type = 'notice',
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
      // @ts-ignore
      className={classes[type]}
      divider
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
        <Typography
          variant='subtitle2'
          className={classes.mainSubtitle}
          component={'p'}
        >
          {code}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {message}
        </Typography>
        <WithHighlight>{String(context)}</WithHighlight>
      </div>
    </ListItem>
  )
}
