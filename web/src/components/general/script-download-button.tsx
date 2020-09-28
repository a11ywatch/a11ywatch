/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useState } from 'react'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'

const convertDownloadPath = (cdn: string) =>
  cdn?.replace('scripts/', 'download/')

export function ScriptDownloadButton({ cdn_url, cdn_url_min }: any) {
  const [menuOpen, toggleMenu] = useState(null)

  const handleMenu = (event: any) => {
    toggleMenu(event.currentTarget)
  }

  const handleClose = () => {
    toggleMenu(null)
  }

  return (
    <div>
      <IconButton
        aria-label='download script options for custom cdn fix'
        aria-controls='script-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id='script-appbar'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={menuOpen}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!menuOpen}
        onClose={handleClose}
      >
        <MenuItem
          href={convertDownloadPath(cdn_url)}
          component={'a'}
          onClick={handleClose}
        >
          Download
        </MenuItem>
        <MenuItem
          href={convertDownloadPath(cdn_url_min)}
          component={'a'}
          onClick={handleClose}
        >
          Download Minified
        </MenuItem>
      </Menu>
    </div>
  )
}
