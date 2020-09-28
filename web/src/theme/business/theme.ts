/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createMuiTheme } from '@material-ui/core/styles'

import {
  red,
  blue,
  indigo,
  grey,
  orange,
  yellow,
} from '@material-ui/core/colors'
import { h1, h2, h6, subtitle1 } from '../common'

export const theme = (function () {
  const buttonStyles = {
    background: `linear-gradient(45deg, #78909C 30%, #607D8B 90%)`,
    borderRadius: 3,
    padding: '0 30px',
    color: '#fff',
    border: 0,
  }
  return createMuiTheme({
    typography: {
      fontFamily: [
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      button: buttonStyles,
      h3: {
        lineHeight: 1.3,
      },
    },
    palette: {
      type: 'dark',
      primary: blue,
      secondary: {
        main: blue[300],
        default: blue[500],
      },
      background: {
        main: '#20232a',
        default: '#20232a',
        paper: '#1a1a1a',
      },
      warning: orange,
      error: red,
    },
    // @ts-ignore
    color: {
      mainLight: 'rgb(66, 66, 66)',
      blue: blue[200],
      indigo: indigo[400],
      primary: grey[900],
      black: '#121212',
      grey: grey[400],
      yellow: yellow[400],
      red: red[400],
      orange: orange[600],
      border: 'rgba(255, 255, 255, 0.12)',
    },
  })
})()

theme.typography.h1 = h1(theme)
theme.typography.h2 = h2(theme)
theme.typography.h6 = h6(theme)

theme.typography.body1 = h6(theme)
theme.typography.subtitle1 = subtitle1(theme)

export default theme
