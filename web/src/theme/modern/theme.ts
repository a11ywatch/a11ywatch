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
    background: `linear-gradient(45deg, ${indigo[600]} 30%, ${indigo[900]} 90%)`,
    borderRadius: 3,
    padding: '0 30px',
    color: '#fff',
    border: 0,
  }
  return createMuiTheme({
    typography: {
      fontFamily: [
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
      primary: indigo,
      secondary: {
        main: indigo[600],
        default: indigo[700],
      },
      warning: orange,
      error: red,
      background: {
        main: '#1a1a1a',
        default: '#1a1a1a',
        paper: '#1a1a1a',
      },
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
