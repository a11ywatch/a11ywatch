/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

type GetFontContrastInput = {
  contrastRatio?: number
  elementFontSize?: string | number
}

type GetFontContrastReturn = {
  errorAALarge?: number
  errorAASmall?: number
  warningAALarge?: number
  warningAASmall?: number
}

const getFontContrastErrors = ({
  parentBackgroundColor,
  elementColor,
}: GetFontContrastInput): GetFontContrastReturn => {
  const errorAALarge =
    contrastRatio < 2.5 && parseInt(elementFontSize, 10) >= 24
  const errorAASmall =
    contrastRatio < 2.5 && parseInt(elementFontSize, 10) <= 16
  const warningAALarge =
    contrastRatio < 2.9 && parseInt(elementFontSize, 10) >= 24
  const warningAASmall =
    contrastRatio < 2.9 && parseInt(elementFontSize, 10) <= 16

  const contrastFontError =
    errorAALarge ||
    errorAASmall ||
    warningAALarge ||
    warningAASmall ||
    parseInt(elementFontSize, 10) < 8

  return {
    errorAALarge,
    errorAASmall,
    warningAALarge,
    warningAASmall,
    contrastFontError,
  }
}

export { getFontContrastErrors }
