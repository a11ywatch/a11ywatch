/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState } from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { AppManager } from '@app/managers'
import { Link } from '../link'
import { RenderAvatar, RenderSecondary } from './render'

const useStyles = makeStyles(() => ({
  root: {
    ['&:hover']: {
      textDecoration: 'none',
    },
  },
  title: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    fontSize: '1.1em',
    fontWeight: 500,
  },
}))

export function WebsiteCell({
  url,
  removePress,
  handleClickOpen,
  subDomains,
  handleClickOpenPlayer,
  issues,
  issuesInfo,
  history,
  adaScore,
  cdnConnected,
  crawlWebsite,
  setModal,
  html,
  pageLoadTime,
  mutatationLoading,
  lastScanDate,
  pageHeaders,
}: any) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleMenu = (event: any) => {
    setAnchorEl(event?.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const href = `/website-details?websiteUrl=${encodeURIComponent(url)}`

  const handleMainClick = (
    eventData?: any,
    title?: string,
    mini?: boolean,
    url?: string
  ) => () => {
    mini
      ? handleClickOpenPlayer(true, eventData, title)()
      : handleClickOpen(eventData, title, url)
    setAnchorEl(null)
  }
  const modalClick = () => {
    setModal({ open: true, modalType: 2, html, url })
    setAnchorEl(null)
  }

  const authForm = (
    <div>
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id='menu-appbar'
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
        <MenuItem component={Link} href={href} color='inherit'>
          View Website
        </MenuItem>
        {issues?.length ? (
          <MenuItem onClick={handleMainClick(issues, 'Issues', false, url)}>
            View Issues
          </MenuItem>
        ) : null}
        {subDomains?.length ? (
          <MenuItem
            onClick={handleMainClick(subDomains, 'All Pages', false, url)}
          >
            View Pages
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleMainClick(url, '', true)}>
          View Website (Mini Player)
        </MenuItem>
        {typeof setModal !== 'undefined' && html ? (
          <MenuItem onClick={modalClick}>View Source</MenuItem>
        ) : null}
        <MenuItem
          onClick={handleMainClick(pageHeaders, 'Custom Headers', false, url)}
        >
          Update Headers
        </MenuItem>
        {typeof crawlWebsite !== 'undefined' ? (
          <MenuItem
            onClick={() => {
              crawlWebsite({
                variables: {
                  url,
                },
              }).catch((res: any) => {
                const errors = res?.graphQLErrors.map((error: any) => {
                  return error.message
                })
                console.log(errors)
              })
              handleClose()
              AppManager.toggleSnack(
                true,
                'Scan in progress, if new issues occur you will be alerted',
                'success'
              )
            }}
          >
            Scan
          </MenuItem>
        ) : null}
        {removePress && !history ? (
          <MenuItem onClick={() => removePress(url)} style={{ color: 'red' }}>
            Delete
          </MenuItem>
        ) : null}
      </Menu>
    </div>
  )

  return (
    <ListItem
      button
      component={Link}
      href={href}
      color={'inherit'}
      className={classes.root}
    >
      <RenderAvatar
        cdnConnected={cdnConnected}
        adaScore={adaScore}
        error={false}
      />
      <div>
        <ListItemText
          primary={url}
          primaryTypographyProps={{
            className: classes.title,
          }}
        />
        <RenderSecondary
          issuesInfo={issuesInfo}
          cdnConnected={cdnConnected}
          adaScore={adaScore}
          issues={issues}
          pageLoadTime={pageLoadTime}
          mutatationLoading={mutatationLoading}
          lastScanDate={lastScanDate}
          pageHeaders={pageHeaders}
        />
      </div>
      <ListItemSecondaryAction>{authForm}</ListItemSecondaryAction>
    </ListItem>
  )
}
