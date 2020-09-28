/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import {
  FormControlLabel,
  Switch,
  ListItemIcon,
  ListItem,
} from '@material-ui/core'
import {
  Notifications as NotificationsIcon,
  Code as CodeIcon,
  CloudDownloadOutlined as CloudDownloadOutlinedIcon,
  DataUsage as DataUsageIcon,
  BugReport as BugReportIcon,
  Report as ReportIcon,
  ChangeHistory as ChangeHistoryIcon,
  Dashboard as DashboardIcon,
} from '@material-ui/icons'
import { cellStyles } from '@app/styles/cells'
import { Link } from '../link'
import { Pulse } from '../loaders'

const renderIcon = (feature?: string, className?: string) => {
  switch (feature) {
    case 'Alerts':
      return <NotificationsIcon className={className} />
    case 'Scripts':
      return <CodeIcon />
    case 'CDN':
      return <CloudDownloadOutlinedIcon />
    case 'Analytics':
      return <DataUsageIcon />
    case 'Issues':
      return <BugReportIcon />
    case 'Dashboard':
      return <DashboardIcon />
    case 'Urgent':
      return <ReportIcon />
    case 'History':
      return <ChangeHistoryIcon />
    default:
      return <div />
  }
}

const extraProps = (
  feature?: string,
  focused?: boolean,
  toggleAlert?: any,
  setEvents?: any
) => {
  switch (feature) {
    case 'Alerts':
      return {
        onClick: toggleAlert,
      }
    case 'Scripts':
      return {
        href: focused ? '/dashboard' : '/scripts',
        component: Link,
        color: 'inherit',
      }
    case 'CDN':
      return {
        href: focused ? '/dashboard' : '/cdn-fix',
        onClick: setEvents ? () => setEvents({ firstAdd: 'set' }) : undefined,
        component: Link,
        color: 'inherit',
      }
    case 'Issues':
      return {
        href: focused ? '/dashboard' : '/web-issues',
        component: Link,
        color: 'inherit',
      }
    case 'Analytics':
      return {
        href: focused ? '/dashboard' : '/analytics',
        component: Link,
        color: 'inherit',
      }
    case 'Dashboard':
      return {
        href: '/dashboard',
        component: Link,
        color: 'inherit',
      }
    case 'Urgent':
      return {
        href: focused ? '/dashboard' : '/urgent-issues',
        component: Link,
        color: 'inherit',
      }
    case 'History':
      return {
        href: focused ? '/dashboard' : '/history',
        component: Link,
        color: 'inherit',
      }
    default:
      return null
  }
}

function renderGuide(index: number, events: any) {
  if (index === 2 && events?.firstAdd === true) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
        <Pulse visible size={20} />
      </div>
    )
  }

  return null
}

export function FeaturesCell({
  feature,
  alertEnabled = false,
  index,
  toggleAlert,
  focused,
  isMobile,
  events,
  setEvents,
}: any) {
  const classes = cellStyles()

  return (
    <ListItem
      button
      {...extraProps(feature, focused, toggleAlert, setEvents)}
      className={classes.topList}
    >
      <ListItemIcon>
        {renderIcon(
          focused ? 'Dashboard' : feature,
          (index === 0 && alertEnabled && !isMobile && classes.alert) ||
            undefined
        )}
      </ListItemIcon>
      {focused ? 'Dashboard' : feature}
      {index === 0 ? (
        <FormControlLabel
          checked={alertEnabled}
          value='Alerts'
          control={<Switch color='primary' />}
          label=''
          labelPlacement='start'
          className={classes.toggleAlert}
        />
      ) : null}
      {!isMobile ? renderGuide(index, events) : null}
    </ListItem>
  )
}
