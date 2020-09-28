/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const fontFamilys = [
  'IBM Plex Sans',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
]

const colors = {
  main: 'grey',
  secondary: '#5c6bc0',
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  gray: {
    100: '#f7fafc',
    900: '#1a202c',
  },
}

const theme = {
  colors,
  fontFamily: {
    display: fontFamilys,
    body: fontFamilys,
  },
  textColor: (theme) => theme('colors'),
}

module.exports = {
  theme,
}
