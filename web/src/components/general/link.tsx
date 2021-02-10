/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { forwardRef } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import MuiLink from '@material-ui/core/Link'

const NextComposed = forwardRef(({ as, href, ...other }: any, ref: any) => (
  <NextLink href={href} as={as}>
    <a ref={ref} {...other} />
  </NextLink>
))

function MNLink({
  activeClassName = 'active',
  innerRef,
  className,
  naked,
  as: asValue,
  href,
  external,
  ...props
}: any) {
  const router = useRouter()
  const component = String(href).includes('http') ? 'a' : NextComposed
  const as = asValue ?? external ? undefined : href

  if (naked) {
    return (
      <NextComposed
        className={`${className} ${
          router?.pathname === href ? activeClassName : ''
        }`}
        as={as}
        href={href}
        ref={innerRef}
        {...props}
      />
    )
  }

  return (
    <MuiLink
      component={component}
      className={className}
      ref={innerRef}
      as={as}
      href={href}
      {...props}
    />
  )
}

const Link = forwardRef((props: any, ref: any) => (
  <MNLink {...props} innerRef={ref} />
))

export { Link }
