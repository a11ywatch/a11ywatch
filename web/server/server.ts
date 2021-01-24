/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import express, { Request, Response } from 'express'
import next from 'next'
import path from 'path'
import cors from 'cors'
import fetch from 'isomorphic-unfetch'

const dev = process.env.NODE_ENV !== 'production'
const URL_ENDPOINT = process.env.IFRAME_URL || 'http://iframe-server:8010'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  const server = express()
  server.use(express.static(path.join(__dirname, 'public')))

  server.get('/iframe', async (req: Request, res: Response) => {
    try {
      const data = await fetch(
        `${URL_ENDPOINT}/iframe?url=${encodeURI(
          String(req.query.url)
        )}&baseHref=${req.query.baseHref || true}`
      )
      if (data) {
        const text = await data.text()
        res.send(text)
      }
    } catch (e) {
      console.error('iframe api endpoint error', e)
    }
  })
  // @ts-ignore
  server.all('*', cors(), (req, res) => handle(req, res))

  server.listen(port, () => console.log(`app ready on ${`port: ${port}`}`))
})
