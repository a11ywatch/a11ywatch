/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import express from 'express'
import type { Request, Response } from 'express'
import next from 'next'
import { join } from 'path'
import fetch from 'isomorphic-unfetch'
import rateLimit from 'express-rate-limit'

const dev = process.env.NODE_ENV !== 'production'
const URL_ENDPOINT = String(process.env.IFRAME_URL || 'http://localhost:8010')
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
})

app.prepare().then(() => {
  const server = express()
  server.use(express.static(join(__dirname, 'public')))
  server.use(limiter)

  server.get('/iframe', async (req: Request, res: Response) => {
    let url = String(req.query.url)

    if (/^((http|https):\/\/)/.test(url) === false) {
      url = `http://${url}`
    }

    try {
      const data = await fetch(
        `${URL_ENDPOINT}/iframe?url=${encodeURI(url)}&baseHref=${
          req.query.baseHref || true
        }`
      )
      const text = await data.text()

      res.send(text)
    } catch (e) {
      console.error(
        dev
          ? 'check your env variable for IFRAME_URL, if its missing try adding if in docker http://iframe-server:8010 or http://localhost:8010'
          : 'iframe api endpoint error',
        e
      )
      res.send('')
    }
  })

  server.all('*', (req: Request, res: Response) => handle(req, res))

  server.listen(port, () => console.log(`app ready on ${`port: ${port}`}`))
})
