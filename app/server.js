// change cwd to ./app
process.chdir(__dirname)
// attach nvim
const { plugin } = require('./nvim')
const next = require('next')
const { createServer } = require('http')
const fs = require('fs')
const path = require('path')

// TODO: dev
const app = next({ dev: false })
const clients = {}

app.prepare().then(async () => {
  // http server
  const server = createServer((req, res) => {
    const asPath = req.url.replace(/[?#].*$/, '')
    if (/\/page\/\d+/.test(asPath)) {
      fs.createReadStream('./out/index.html').pipe(res)
    } else if (/\/_next/.test(asPath)) {
      fs.createReadStream(path.join('./out', asPath)).pipe(res)
    } else if (/\/_static/.test(asPath)) {
      fs.createReadStream(path.join('./', asPath)).pipe(res)
    } else {
      res.end('404')
    }
  })
  // websocket server
  const io = require('socket.io')(server)

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
})

