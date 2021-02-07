/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { makeStyles } from '@material-ui/core/styles'
import type { MergedTheme } from '@app/theme'

export const formDialogStyles = makeStyles((theme: MergedTheme) => ({
  row: {
    flexDirection: 'row',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1) - 4.2,
  },
  addButton: {
    marginLeft: theme.spacing(1),
  },
  dialogPadding: {
    paddingTop: `${theme.spacing(1)}px !important`,
  },
  input: {
    marginLeft: 2,
    flex: 1,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      minWidth: 60,
      marginLeft: 'auto',
    },
  },
  inputAdjust: {
    marginLeft: 4,
  },
  formLabel: {
    marginLeft: 10,
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      marginRight: 14,
    },
  },
  inputSelect: {
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
      paddingRight: 0,
    },
    maxHeight: '50vh',
  },
  formLabelText: {
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
    },
  },
  textInput: {
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
  },
  buttonAdjust: {
    marginTop: 12,
    minWidth: 300,
    paddingTop: 6,
    paddingBottom: 6,
    '&:hover': {
      background: '#fff',
      color: theme.color.primary,
    },
    [theme.breakpoints.down('md')]: {
      minWidth: 380,
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '96.5%',
    },
  },
  formControl: {
    marginLeft: 4,
    marginRight: 10,
    width: 'auto',
    minWidth: 70,
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      minWidth: 60,
    },
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  topTitle: {
    flex: 1,
    ['& > h2']: {
      fontWeight: 600,
    },
  },
}))
