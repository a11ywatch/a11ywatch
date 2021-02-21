/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(import('@monaco-editor/react'), {
  ssr: false,
})
const ReactSizeDetector = dynamic(import('react-resize-detector'), {
  ssr: false,
})

const WithEditor = ({
  setScript,
  children = '',
  language = 'javascript',
}: any) => {
  const [value, setValue] = useState<any>(children || '')

  useEffect(() => {
    if (setScript) {
      setScript(value)
    }
  }, [setScript, value])

  return (
    <ReactSizeDetector handleWidth handleHeight>
      {({ height, width }: any) => (
        <MonacoEditor
          onChange={setValue}
          value={value}
          language={language}
          defaultValue={children}
          theme='vs-dark'
          height={height || '100%'}
          width={width || '100%'}
        />
      )}
    </ReactSizeDetector>
  )
}

export { WithEditor }
