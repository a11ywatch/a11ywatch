/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'

interface Props {
  email: string
  subject: string
  body: string
  children?: string | Node
  className?: any
}

function Mailto({ email, subject, body, className, children }: Props) {
  return (
    <a
      className={className}
      href={`mailto:${email}?subject=${
        encodeURIComponent(subject) || ''
      }&body=${encodeURIComponent(body) || ''}`}
    >
      {children}
    </a>
  )
}

export { Mailto }
