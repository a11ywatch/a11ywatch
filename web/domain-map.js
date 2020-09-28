/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const validThemes = ['main', 'business', 'modern']

const domainMap = (domainType) => {
  // TODO: use a different env var to detect domain strings process.env.APP_NAME ( move app strings to seperate lib )
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
    themeType: (validThemes.includes(domainType) && domainType) || 'main',
    stringType,
  }
}

module.exports = {
  domainMap,
}
