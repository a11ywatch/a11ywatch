/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { render, screen } from '@testing-library/react'
import ContactPage from '../../src/pages/contact'

describe('ContactPage', () => {
  it('renders without crashing', () => {
    render(<ContactPage />)
    expect(
      screen.getByRole('heading', { name: 'Lets have a Talk' })
    ).toBeInTheDocument()
  })
})
