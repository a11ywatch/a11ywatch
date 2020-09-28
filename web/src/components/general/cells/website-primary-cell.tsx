/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState } from 'react'

import {
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Typography,
  Container,
  Menu,
  Checkbox,
  MenuItem,
} from '@material-ui/core'
import {
  MoreVert as MoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { WithHighlight } from '@app/components/adhoc'

import { issueSort } from '@app/lib'
import { RenderAvatar, RenderSecondary } from './render'

import { Link } from '../link'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    color: 'inherit',
  },
  listTitle: {
    maxWidth: '50vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#fff',
    flex: 1,
    fontSize: '1.1em',
    fontWeight: 600,
  },
  mainItemContainer: {
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingLeft: '14px',
    paddingRight: '14px',
    paddingTop: '6px',
    paddingBottom: '6px',
    // @ts-ignore
    borderBottom: `1px solid ${theme.color.border}`,
  },
  list: {
    maxHeight: '50vh',
  },
  smallList: {
    maxHeight: '65vh',
  },
  overScroll: {
    '-webkit-overflow-scrolling': 'touch',
    paddingBottom: '2px',
    paddingTop: 0,
  },
  listContainer: {
    flex: 1,
    display: 'block',
    overflowX: 'hidden',
    padding: 0,
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
  spacer: {
    marginBottom: 1,
  },
  noText: {
    textDecoration: 'none',
    ['&:hover']: {
      textDecoration: 'none',
    },
  },
  adaScore: {
    fontSize: '13px',
    fontWeight: 600,
    textAlign: 'center',
    left: '1.5px',
    position: 'relative',
  },
}))

function RenderIssue({
  message,
  code,
  context,
  type,
  selector,
  pageIssues = [],
  error,
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
      divider={pageIssues?.length > 1}
      // @ts-ignore
      className={`${classes[type] ? classes[type] : ''} ${
        !error ? classes.spacer : ''
      }`}
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
          variant='subtitle1'
          component={'span'}
          className={`${classes.mainTitle} ${classes.normalContentColor}`}
        >
          {selector}
        </Typography>
        <Typography
          variant='subtitle2'
          className={classes.mainSubtitle}
          component={'span'}
        >
          {code}
        </Typography>
        <WithHighlight>{String(context)}</WithHighlight>
        <Typography variant='subtitle1' component={'span'}>
          {message}
        </Typography>
      </div>
    </ListItem>
  )
}

// TODO SPLIT CELLS OUT
export function WebsitePrimaryCell({
  handleClickOpen,
  // handleClose,
  // open,
  item,
  // refetch,
  url,
  handleClickOpenPlayer,
  issuesModal = false,
  error = false,
  handleToggle,
  checked,
  checkList,
  listIndex,
  openError,
  noMaxHeight,
}: any) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [issueView, setIssueView] = useState(error)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const viewIssue = (e: any) => {
    if (e?.preventDefault) {
      e.preventDefault()
    }
    if (anchorEl) {
      handleMenuClose()
    }
    setIssueView(!issueView)
  }

  const handleMainClick = (
    eventData: any,
    title?: string,
    mini?: boolean
  ) => () => {
    mini
      ? handleClickOpenPlayer(true, eventData, title)()
      : handleClickOpen(eventData, title, url)
    setAnchorEl(null)
  }

  const pageIssues = Array.isArray(item?.issues)
    ? item.issues
    : item?.issues?.issues
  const secondaryText = pageIssues?.length
    ? `${pageIssues.length} issue${pageIssues?.length === 1 ? '' : 's'} found!`
    : null
  const mainUrl = item?.url || item?.pageUrl
  const href = `/website-details?websiteUrl=${encodeURIComponent(mainUrl)}`

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
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} href={href} color='inherit'>
          View Website
        </MenuItem>
        {pageIssues?.length || error ? (
          <MenuItem onClick={viewIssue}>
            {issueView ? 'Hide' : 'View'} Issues
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleMainClick(mainUrl, 'Mini Player', true)}>
          View Website (Mini Player)
        </MenuItem>
      </Menu>
    </div>
  )

  const renderIssues = error ? (
    <RenderIssue
      {...item}
      error={error}
      checkList={checkList}
      handleToggle={handleToggle}
      checked={checked}
      listIndex={listIndex}
      openError={openError}
    />
  ) : (
    pageIssues?.length &&
    pageIssues.sort(issueSort).map((webpages: any, webpageIndex: number) => {
      return (
        <RenderIssue
          {...webpages}
          error={error}
          checkList={checkList}
          handleToggle={handleToggle}
          checked={checked}
          listIndex={listIndex}
          openError={openError}
          key={`${webpageIndex} ${webpages?.selector} ${webpages?.code}`}
        />
      )
    })
  )

  const linkType = openError && !issuesModal

  const extraProps = issueView
    ? {}
    : {
        component: linkType ? Link : 'button',
        href: linkType ? href : undefined,
        color: 'inherit',
        onClick: linkType ? undefined : viewIssue,
        className: classes.noText,
      }

  if (issueView) {
    return (
      <div>
        {!error ? (
          <div className={classes.row}>
            <Typography
              variant={'h6'}
              className={classes.title}
              component={Link}
              href={href}
            >
              {mainUrl}
            </Typography>
            <div className={classes.flex} />
            <IconButton onClick={viewIssue}>
              <ExpandLessIcon color={'primary'} />
            </IconButton>
          </div>
        ) : null}
        <Fade in timeout={750}>
          <Container className={classes.listContainer} maxWidth={'xl'}>
            <List
              className={`${
                pageIssues?.length === 1
                  ? classes.smallList
                  : noMaxHeight
                  ? ''
                  : classes.list
              } ${classes.overScroll}`}
            >
              {renderIssues}
            </List>
          </Container>
        </Fade>
      </div>
    )
  }

  return (
    <ListItem divider {...extraProps}>
      <RenderAvatar {...item} error={error} />
      <div>
        <ListItemText
          primary={mainUrl || item?.selector}
          primaryTypographyProps={{
            className: classes.listTitle,
          }}
        />
        <RenderSecondary
          {...item}
          secondaryText={secondaryText || item?.context}
        />
      </div>
      <ListItemSecondaryAction>{authForm}</ListItemSecondaryAction>
    </ListItem>
  )
}
