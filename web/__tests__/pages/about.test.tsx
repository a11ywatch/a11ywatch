/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { render, screen } from '@testing-library/react'
import AboutPage from '@app/pages/about'
import { strings } from '@app/content/strings/a11y/en'

describe('AboutPage', () => {
  it('renders without crashing', () => {
    render(<AboutPage />)
    expect(
      screen.getByRole('heading', { name: `About ${strings.appName}` })
    ).toBeInTheDocument()
  })
})
