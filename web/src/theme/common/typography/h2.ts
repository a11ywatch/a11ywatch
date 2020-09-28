/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const h2 = (theme: any, props: any = {}) => ({
  fontSize: '3.75rem',
  fontWeight: 600,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  '@media (min-width:600px)': {
    fontSize: '4rem',
  },
  [theme.breakpoints.down('381')]: {
    fontSize: '3.4rem',
  },
  [theme.breakpoints.down('321')]: {
    fontSize: '2.8rem',
  },
  ...props,
})
