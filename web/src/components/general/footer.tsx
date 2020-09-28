/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'

import { Routes, APP_TYPE } from '@app/configs'
import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'

import { Link } from './link'
import { FixedCopyRight } from './fixed-copy-right'
import {
  GithubBadge,
  TwitterBadge,
  FacebookBadge,
  LinkedinBadge,
} from '../badges'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 24,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'inherit',
  },
  flex: {
    flex: 1,
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    display: 'flex',
  },
  linkContainer: {
    marginTop: 12,
    display: 'block',
    paddingBottom: 20,
    listStyleType: 'none',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  logo: {
    fontWeight: 'bold',
  },
  blockContainer: {
    flex: 0.2,
    marginRight: 20,
  },
  sticky: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
}))

const BLOG_URL = `https://${strings.appName.toLowerCase()}.blog`

const NavLinks: any = ({ className, filterType }: any) => {
  return Routes.reverse()
    .filter(({ type }: any) => type === filterType)
    .map(({ href, name, as }: any) => (
      <li key={href + name}>
        {
          React.createElement(
            href === BLOG_URL || href === 'https://www.miniprograms.xyz'
              ? 'a'
              : Link,
            {
              color: (href !== BLOG_URL && 'inherit') || undefined,
              className,
              style: { lineHeight: 2 },
              as,
              children: name,
              variant: 'subtitle2',
              target:
                href === `https://${strings.appName.toLowerCase()}.blog` ||
                href === 'https://www.miniprograms.xyz'
                  ? '_blank'
                  : null,
              href,
            }
          ) as any
        }
      </li>
    ))
}

const Footer = ({ sticky }: { sticky?: boolean }) => {
  const classes = useStyles()

  return (
    <footer className={`${classes.root} ${sticky ? classes.sticky : ''}`}>
      <Container maxWidth='lg'>
        <div className={classes.block}>
          <div className={classes.link}>
            <div className={classes.blockContainer}>
              <Typography className={classes.logo}>
                {strings.appName}
              </Typography>
              <ul className={classes.linkContainer}>
                {[
                  { icon: <LinkedinBadge inline /> },
                  { icon: <FacebookBadge inline /> },
                  { icon: <TwitterBadge inline /> },
                  { icon: <GithubBadge inline /> },
                ].map(({ icon }: any, i: number) => (
                  <li className={classes.link} key={i}>
                    {icon}
                  </li>
                ))}
              </ul>
            </div>
            <div className={classes.blockContainer}>
              <Typography>Explore</Typography>
              <ul className={classes.linkContainer}>
                {
                  React.createElement(NavLinks, {
                    filterType: 'explore',
                  }) as any
                }
              </ul>
            </div>
            <div className={classes.blockContainer}>
              <Typography>Resources</Typography>
              <ul className={classes.linkContainer}>
                {
                  React.createElement(NavLinks, {
                    filterType: 'resources',
                  }) as any
                }
              </ul>
            </div>
          </div>
          {APP_TYPE !== 'main' ? (
            <div className={classes.linkContainer}>
              <Typography variant={'body2'}>
                {strings.appName} Group ® Brands:
              </Typography>
              <Typography
                component={'a'}
                href={`https://www.${strings.appName.toLowerCase()}.com`}
                variant={'body2'}
                color={'secondary'}
                style={{ marginLeft: 6 }}
              >
                {strings.appName}
              </Typography>
            </div>
          ) : null}
          <FixedCopyRight />
        </div>
      </Container>
    </footer>
  )
}

export { Footer }
