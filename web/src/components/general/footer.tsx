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
  TranslateBadge,
} from '../badges'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '6%',
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  linkContainer: {
    marginTop: 12,
    display: 'block',
    paddingBottom: 20,
    listStyleType: 'none',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      fontSize: '1.5em',
    },
  },
  socialContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  },
  logo: {
    fontWeight: 'bold',
  },
  blockContainer: {
    flex: 0.2,
    marginRight: '1.5em',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  sticky: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  linkSpace: {
    lineHeight: 2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.95em',
    },
  },
  linkHeading: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7em',
      fontWeight: '600',
    },
  },
  spacing: {
    paddingTop: '20vh',
  },
}))

const NavLinks: any = ({ className, filterType }: any) => {
  return Routes.reverse()
    .filter(({ type }: any) => type === filterType)
    .map(({ href, name }: any) => {
      return (
        <li key={href + name}>
          <Link
            color={'inherit'}
            className={className}
            children={name}
            variant={'subtitle1'}
            href={href}
          />
        </li>
      )
    })
}

const Footer = ({
  sticky,
  footerSpacing,
}: {
  sticky?: boolean
  footerSpacing?: boolean
}) => {
  const classes = useStyles()

  const SectionLinks = ({ title }: { title: string }) => {
    return (
      <div className={classes.blockContainer}>
        <Typography variant={'h4'} className={classes.linkHeading}>
          {title}
        </Typography>
        <ul className={classes.linkContainer}>
          <NavLinks
            filterType={title.toLowerCase()}
            className={classes.linkSpace}
          />
        </ul>
      </div>
    )
  }

  return (
    <footer
      className={`${classes.root}${sticky ? ` ${classes.sticky}` : ''}${
        footerSpacing ? ` ${classes.spacing}` : ''
      }`}
    >
      <Container maxWidth='lg'>
        <div className={classes.link}>
          <div className={classes.blockContainer}>
            <Typography className={classes.logo}>{strings.appName}</Typography>
            <ul
              className={`${classes.linkContainer} ${classes.socialContainer}`}
            >
              {[
                { Icon: TwitterBadge },
                { Icon: GithubBadge },
                { Icon: FacebookBadge },
                { Icon: LinkedinBadge },
              ].map(({ Icon }: any, i: number) => (
                <li className={classes.link} key={i}>
                  <Icon inline />
                </li>
              ))}
            </ul>
          </div>
          <SectionLinks title={'Explore'} />
          <SectionLinks title={'Resources'} />
          <SectionLinks title={'Company'} />
          <SectionLinks title={'Legal'} />
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
        <div className={classes.linkContainer}>
          <TranslateBadge inline />
        </div>
      </Container>
      <FixedCopyRight />
    </footer>
  )
}

export { Footer }
