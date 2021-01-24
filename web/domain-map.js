/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const validThemes = ['main', 'business', 'modern']

const domainMap = (domainType) => {
  let stringType = ''

  switch (domainType) {
    case 'business':
      stringType = 'adanet'
      break
    case 'modern':
      stringType = 'enable'
      break
    default:
      stringType = 'a11y'
      break
  }

  return {
    themeType: validThemes.includes(domainType) || 'main',
    stringType,
  }
}

module.exports = {
  domainMap,
}
