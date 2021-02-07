/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState } from 'react'
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  MenuItem,
} from '@material-ui/core'
import { Folder as FolderIcon, MoreVert as MoreIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '../link'
import { TopMenu } from '../top-menu'
import type { IssueCellProps } from './types'

const useStyles = makeStyles(() => ({
  title: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#fff',
    flex: 1,
  },
}))

export function IssuesCell({
  url,
  handleClickOpen,
  handleClickOpenPlayer,
  issues,
  index,
}: IssueCellProps) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMainClick = (eventData: any, title: any, mini: boolean) => () => {
    mini
      ? handleClickOpenPlayer(true, eventData, title)()
      : handleClickOpen(eventData, title, url, true)
    setAnchorEl(null)
  }
  const href = `/website-details?websiteUrl=${url}`

  const menuId = `issues-appbar${index}`

  const authForm = (
    <div>
      <IconButton
        aria-label={`websites ${url || 'url'} more actions`}
        aria-controls={menuId}
        aria-haspopup='true'
        onClick={handleMenu}
        color={'inherit'}
      >
        <MoreIcon />
      </IconButton>
      <TopMenu
        id={menuId}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem component={Link} href={href} color={'inherit'}>
          View Website
        </MenuItem>
        {issues?.length ? (
          <MenuItem onClick={handleMainClick(issues, 'Issues', false)}>
            View Issues
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleMainClick(url, 'Mini Player', true)}>
          View Website (Mini Player)
        </MenuItem>
      </TopMenu>
    </div>
  )

  return (
    <ListItem button component={Link} href={href} color={'inherit'} dense>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={url}
        className={classes.title}
        secondary={
          issues?.length
            ? `${issues.length} issues found`
            : String.fromCharCode(160)
        }
      />
      <ListItemSecondaryAction>{authForm}</ListItemSecondaryAction>
    </ListItem>
  )
}
