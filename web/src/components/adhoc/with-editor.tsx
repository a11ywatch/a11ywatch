/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(import('react-monaco-editor'), {
  ssr: false,
})
const ReactSizeDetector = dynamic(import('react-resize-detector'), {
  ssr: false,
})

const WithEditor = ({ setScript, children = '' }: any) => {
  const [value, setValue] = useState(children || '')

  useEffect(() => {
    setScript(value)
  }, [value])

  return (
    <ReactSizeDetector handleWidth handleHeight>
      {({ height, width }: any) => (
        <MonacoEditor
          onChange={(e: string) => setValue(e)}
          value={value}
          language='javascript'
          editorDidMount={(editor: any) => {
            editor?.focus()
            // @ts-ignore
            if (typeof window !== 'undefined' && window.MonacoEnvironment) {
              // @ts-ignore
              window.MonacoEnvironment.getWorkerUrl = (_: any, label: any) => {
                if (label === 'javascript')
                  return '_next/static/editor.worker.js'
              }
            }
          }}
          theme='vs-dark'
          height={height || '345px'}
          width={width || '100%'}
        />
      )}
    </ReactSizeDetector>
  )
}

export { WithEditor }
