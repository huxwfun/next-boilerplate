const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const next = require('next')
const getConfig = require('next/config').default
const fetch = require('isomorphic-unfetch')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  const { port, github_client_id } = getConfig().publicRuntimeConfig
  const { github_client_secret } = getConfig().serverRuntimeConfig

  server.use(cookieParser())
  server.use(bodyParser.json())

  server.get('/', async (req, res) => {
    const { code, ...query } = {...req.query}
    if (code) {
      const result = await fetch(
        `https://github.com/login/oauth/access_token?client_id=${github_client_id}&client_secret=${github_client_secret}&code=${code}&accept=json`,
        { method: 'POST', headers: {
          Accept: 'application/json'
        } }
      )
      const jsonResult = await result.json()
      const token = jsonResult.access_token
      if (token) {
        query.token = jsonResult.access_token
        res.cookie('token', token, {
          maxAge: 30 * 24 * 60 * 60 // 30 days
        })
      }
    }
    return app.render(req, res, '/', query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})