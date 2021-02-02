/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'

type SectionProps = {
  alignRight?: boolean
  children?: any
  className?: string
}

export function Section({ alignRight, children, className }: SectionProps) {
  let textAlign = 'left'
  let margin = 'marginRight'

  if (alignRight) {
    margin = 'marginLeft'
    textAlign = 'right'
  }

  return (
    <div style={{ textAlign, [margin]: 12 }} className={className}>
      {children}
    </div>
  )
}
