/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

type GetFontContrastInput = {
  contrastRatio: number
  elementFontSize: string
}

type GetFontContrastReturn = {
  errorAALarge: boolean
  errorAASmall: boolean
  warningAALarge: boolean
  warningAASmall: boolean
  contrastFontError: boolean
}

const getFontContrastErrors = ({
  elementFontSize,
  contrastRatio,
}: GetFontContrastInput): GetFontContrastReturn => {
  const errorAALarge = Boolean(
    contrastRatio < 2.5 && parseInt(elementFontSize, 10) >= 24
  )
  const errorAASmall = Boolean(
    contrastRatio < 2.5 && parseInt(elementFontSize, 10) <= 16
  )
  const warningAALarge = Boolean(
    contrastRatio < 2.9 && parseInt(elementFontSize, 10) >= 24
  )
  const warningAASmall = Boolean(
    contrastRatio < 2.9 && parseInt(elementFontSize, 10) <= 16
  )

  return {
    errorAALarge,
    errorAASmall,
    warningAALarge,
    warningAASmall,
    contrastFontError: Boolean(
      errorAALarge ||
        errorAASmall ||
        warningAALarge ||
        warningAASmall ||
        parseInt(elementFontSize, 10) < 8
    ),
  }
}

export { getFontContrastErrors }
