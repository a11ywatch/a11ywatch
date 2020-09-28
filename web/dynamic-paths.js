/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const { resolve } = require('path')

const A11Y_WATCH_PATH = './node_modules/@a11ywatch'

const getDynamicPaths = ({ themeType, dev }) => ({
  uiIncludes: [
    resolve(__dirname, `${A11Y_WATCH_PATH}/ui/common`),
    resolve(__dirname, `${A11Y_WATCH_PATH}/ui/${themeType}`),
  ],
  uiStylePath: resolve(__dirname, `${A11Y_WATCH_PATH}/ui/css/tailwind.css`),
  uiComponentPath: resolve(__dirname, `${A11Y_WATCH_PATH}/ui/${themeType}`),
})

module.exports = {
  getDynamicPaths,
}
