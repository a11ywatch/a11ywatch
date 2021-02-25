/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { makeStyles, Theme } from '@material-ui/core/styles'

export const navigationStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      overflowX: 'hidden',
      [theme.breakpoints.down(440)]: {
        overflowX: 'inherit',
      },
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentSmall: {
      paddingTop: theme.mixins.toolbar.minHeight,
    },
    nav: {
      backgroundColor: theme.palette.background.default,
    },
    navContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
    horizontal: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.primary,
      paddingLeft: theme.spacing(1),
      ['& > li']: {
        minWidth: 116,
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          minWidth: 'auto',
        },
      },
      ['& > li > a']: {
        justifyContent: 'center',
      },
    },
    content: {
      paddingTop: '8%',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '4%',
      },
    },
    classHiddenMobile: {
      minWidth: 116,
      ['& > a']: {
        justifyContent: 'center',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
        minWidth: 'auto',
      },
    },
    navigationStaticSpacing: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
      marginTop: Number(theme.mixins.toolbar.minHeight),
      marginBottom: Number(theme.mixins.toolbar.minHeight) / 2,
    },
    register: {
      marginLeft: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 3,
      width: 116,
      [theme.breakpoints.down('sm')]: {
        minWidth: 'auto',
      },
    },
    title: {
      color: 'rgba(255, 255, 255, 0.85)',
      letterSpacing: '.12rem',
      fontWeight: 800,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    flex: {
      flex: 1,
    },
  }
})
