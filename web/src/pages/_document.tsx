/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { ServerStyleSheet } from 'styled-components'
import parser from 'ua-parser-js'
import { userModel, initAppModel } from '@app/data'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets()
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      if (ctx.req) {
        userModel.initModel({
          cookie: ctx.req.headers?.cookie,
          deviceType:
            // @ts-ignore
            parser(ctx.req.headers['user-agent'])?.device?.type || 'desktop',
          originalUrl: ctx.req?.url || '',
        })
        initAppModel()
      }

      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(sheets.collect(<App {...props} />)),
        })

      const initialProps = await Document.getInitialProps(ctx)

      return Object.assign({}, initialProps, {
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {sheets.getStyleElement()}
          </>
        ),
      })
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
