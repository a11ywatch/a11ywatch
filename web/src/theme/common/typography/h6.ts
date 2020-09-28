/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const h6 = (theme: any, props: any = {}) => ({
  fontSize: '1.45rem',
  fontWeight: 400,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  [theme.breakpoints.down('600')]: {
    fontSize: '1.4rem',
  },
  [theme.breakpoints.down('381')]: {
    fontSize: '1.35rem',
  },
  [theme.breakpoints.down('325')]: {
    fontSize: '1.05rem',
  },
  ...props,
})
