/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const { resolve } = require('path')

const A11YWATCH_PATH = './node_modules/@a11ywatch'

const getDynamicPaths = ({ themeType }) => ({
  uiStylePath: resolve(__dirname, `${A11YWATCH_PATH}/ui/css/tailwind.css`),
  uiComponentPath: resolve(__dirname, `${A11YWATCH_PATH}/ui/${themeType}`),
})

module.exports = {
  getDynamicPaths,
}
