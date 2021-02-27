/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import 'jest-next-dynamic'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

global.describePage = jest.fn(
  ({ component, folder, name: target }, callBack) => {
    const name = target ?? (component && component.displayName)

    describe((folder ?? name).toUpperCase(), () => {
      it('renders without crashing', () => {
        render(
          createElement(component ?? require(`@app/pages/${folder}`).default, {
            name,
          })
        )
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

        if (typeof name !== 'undefined') {
          expect(screen.getByRole('heading', { name })).toBeInTheDocument()
        }

        if (typeof callBack === 'function') {
          jest.fn(callBack)
        }
      })
    })
  }
)
