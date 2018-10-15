// change cwd to ./app
process.chdir(__dirname)
// attach nvim
const { plugin } = require('./nvim')
const next = require('next')
const nextRoutes = require('next-routes')
const { createServer } = require('http')

// TODO: dev
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const clients = {}
const tempData = {}

const routes = nextRoutes()
  .add('/page/:bufnr', '/preview-page')

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  console.log(route.page, query)
  app.render(req, res, route.page, query)
})

app.prepare().then(async () => {
  const server = createServer(handler)
  const io = require('socket.io')(server)
  io.on('connection', function (client) {
    const { handshake = { query: {} } } = client
    const bufnr = handshake.query.bufnr

    console.log('client connect: ', client.id, bufnr)

    clients[bufnr] = clients[bufnr] || []
    clients[bufnr].push(client)

    if (tempData[bufnr]) {
      client.emit('refresh_content', { ...tempData[bufnr] })
    }

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
  })
})

