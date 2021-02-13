/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { render, screen } from '@testing-library/react'
import PrivacyPage from '@app/pages/privacy'

describe('PrivacyPage', () => {
  it('renders without crashing', () => {
    render(<PrivacyPage />)
    expect(
      screen.getByRole('heading', { name: 'Privacy Policy' })
    ).toBeInTheDocument()
  })
})
