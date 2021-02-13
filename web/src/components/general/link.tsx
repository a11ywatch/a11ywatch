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
  ...props
}: any) {
  const router = useRouter()
  const external = String(href).includes('http')
  const component = external ? 'a' : NextComposed
  const as = external ? undefined : href

  if (naked) {
    return (
      <NextComposed
        {...props}
        className={`${className} ${
          router?.pathname === href ? activeClassName : ''
        }`}
        as={as}
        href={href}
        ref={innerRef}
      />
    )
  }

  return (
    <MuiLink
      {...props}
      component={component}
      className={className}
      ref={innerRef}
      as={as}
      href={href}
    />
  )
}

const Link = forwardRef((props: any, ref: any) => (
  <MNLink {...props} innerRef={ref} />
))

export { Link }
