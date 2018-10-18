// change cwd to ./app
process.chdir(__dirname)
// attach nvim
const { plugin } = require('./nvim')
const fs = require('fs')
const path = require('path')
const http = require('http')
const websocket = require('socket.io')

const routes = require('./routes')

const clients = {}

// http server
const server = http.createServer((req, res) => {
  // request path
  req.asPath = req.url.replace(/[?#].*$/, '')
  // routes
  routes(req, res, () => {
    res.end('404')
  })
})

// websocket server
const io = websocket(server)

io.on('connection', async (client) => {
  const { handshake = { query: {} } } = client
  const bufnr = handshake.query.bufnr

  console.log('client connect: ', client.id, bufnr)

  clients[bufnr] = clients[bufnr] || []
  clients[bufnr].push(client)

  const buffers = await plugin.nvim.buffers
  buffers.forEach(async (buffer) => {
    if (buffer.id === Number(bufnr)) {
      const cursor = await plugin.nvim.call('getpos', '.')
      const content = await buffer.getLines()
      client.emit('refresh_content', {
        cursor,
        content
      })
    }
  })

  client.on('disconnect', function () {
    console.log('disconnect: ', client.id)
    clients[bufnr] = (clients[bufnr] || []).map(c => c.id !== client.id)
  })
})

server.listen({
  host: 'localhost',
  port: 8081
}, function () {
  function refreshPage ({ bufnr, data }) {
    ;(clients[bufnr] || []).forEach(c => {
      if (c.connected) {
        c.emit('refresh_content', data)
      }
    })
  }
  plugin.init({
    refreshPage
  })
  plugin.nvim.call('mkdp#util#open_browser')
})

