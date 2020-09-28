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
  Menu,
  MenuItem,
} from '@material-ui/core'
import { Folder as FolderIcon, MoreVert as MoreIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '../link'

const useStyles = makeStyles(() => ({
  title: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#fff',
    flex: 1,
  },
}))

type Props = {
  url: string
  handleClickOpen: any
  handleClickOpenPlayer: any
  issues: []
}

export function IssuesCell({
  url,
  handleClickOpen,
  handleClickOpenPlayer,
  issues,
}: Props) {
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

  const authForm = (
    <div>
      <IconButton
        aria-label={`websites ${url || 'url'} more actions`}
        aria-controls='issues-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color={'inherit'}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id='issues-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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
      </Menu>
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
