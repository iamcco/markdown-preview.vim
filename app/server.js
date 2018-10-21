// change cwd to ./app
process.chdir(__dirname)
// attach nvim
const { plugin } = require('./nvim')
const fs = require('fs')
const path = require('path')
const http = require('http')
const websocket = require('socket.io')
const opener = require('opener')
const logger = require('../lib/util/logger')('app/server')

const routes = require('./routes')

const clients = {}

// http server
const server = http.createServer((req, res) => {
  // request path
  req.asPath = req.url.replace(/[?#].*$/, '')
  // routes
  routes(req, res)
})

// websocket server
const io = websocket(server)

io.on('connection', async (client) => {
  const { handshake = { query: {} } } = client
  const bufnr = handshake.query.bufnr

  logger.info('client connect: ', client.id, bufnr)

  clients[bufnr] = clients[bufnr] || []
  clients[bufnr].push(client)

  const buffers = await plugin.nvim.buffers
  buffers.forEach(async (buffer) => {
    if (buffer.id === Number(bufnr)) {
      const cursor = await plugin.nvim.call('getpos', '.')
      const options = await plugin.nvim.getVar('mkdp_preview_options')
      const content = await buffer.getLines()
      client.emit('refresh_content', {
        options,
        cursor,
        content
      })
    }
  })

  client.on('disconnect', function () {
    logger.info('disconnect: ', client.id)
    clients[bufnr] = (clients[bufnr] || []).map(c => c.id !== client.id)
  })
})

async function startServer () {
  let port = await plugin.nvim.getVar('mkdp_port')
  port = port || (8080 + Number(`${Date.now()}`.slice(-3)))
  server.listen({
    host: 'localhost',
    port
  }, function () {
    logger.info('server run: ', port)
    function refreshPage ({ bufnr, data }) {
      logger.info('refresh page: ', bufnr)
      ;(clients[bufnr] || []).forEach(c => {
        if (c.connected) {
          c.emit('refresh_content', data)
        }
      })
    }
    function closePage ({ bufnr }) {
      logger.info('close page: ', bufnr)
      clients[bufnr] = (clients[bufnr] || []).filter(c => {
        if (c.connected) {
          c.emit('close_page')
          return false
        }
        return true
      })
    }
    function openBrowser ({ bufnr }) {
      const url = `http://localhost:${port}/page/${bufnr}`
      logger.info('open page: ', url)
      opener(url)
    }
    plugin.init({
      refreshPage,
      closePage,
      openBrowser
    })

    plugin.nvim.call('mkdp#util#open_browser')
  })
}

startServer()

