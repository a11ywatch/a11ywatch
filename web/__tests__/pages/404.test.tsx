/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { render, screen } from '@testing-library/react'
import 'jest-next-dynamic'
import NotfoundPage from '@app/pages/404'

describe('NotfoundPage', () => {
  it('renders without crashing', () => {
    render(<NotfoundPage />)
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  })
})
