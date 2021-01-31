/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import Color from 'color'

type GetColorInput = {
  parentBackgroundColor?: string
  elementColor?: string
}

type GetColorReturn = {
  background?: string
  foreground?: string
  l1?: string
  l2?: string
  contrastRatio?: number
}

const getAccessibleColors = ({
  parentBackgroundColor,
  elementColor,
}: GetColorInput): GetColorReturn => {
  const background = Color(parentBackgroundColor)
  const foreground = Color(elementColor)
  const l1 = background.luminosity()
  const l2 = foreground.luminosity()
  const elumRatio = Number(
    l1 >= l2 ? l1 + 0.05 / l2 + 0.05 : l2 + 0.05 / l1 + 0.05
  )
  const contrastRatio =
    background.contrast(foreground) +
    (!Number.isFinite(elumRatio) ? elumRatio : 0)

  return {
    background,
    contrastRatio,
    foreground,
    l1,
    l2,
  }
}

export { getAccessibleColors }
