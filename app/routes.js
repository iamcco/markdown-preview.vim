const fs = require('fs')
const path = require('path')
const plantuml = require('node-plantuml')

// TODO: optoin
plantuml.useNailgun() // Activate the usage of Nailgun

const routes = []

const use = function (route) {
  routes.unshift((req, res, next) => () => route(req, res, next))
}

// /page/:number
use((req, res, next) => {
  if (/\/page\/\d+/.test(req.asPath)) {
    return fs.createReadStream('./out/index.html').pipe(res)
  }
  next()
})

// /_next/path
use((req, res, next) => {
  if (/\/_next/.test(req.asPath)) {
    return fs.createReadStream(path.join('./out', req.asPath)).pipe(res)
  }
  next()
})

// /_static/path
use((req, res, next) => {
  if (/\/_static/.test(req.asPath)) {
    return fs.createReadStream(path.join('./', req.asPath)).pipe(res)
  }
  next()
})

// /png/:uml
use((req, res, next) => {
  const prefix = /^\/_uml\/png\//

  if (prefix.test(req.asPath)) {
    res.setHeader('Content-Type', 'image/png')

    const uml = req.asPath.replace(prefix, '')

    const decode = plantuml.decode(uml)
    const gen = plantuml.generate({ format: 'png' })

    decode.out.pipe(gen.in)
    return gen.out.pipe(res)
  }
  next()
})

module.exports = function (req, res, next) {
  return routes.reduce((next, route) => route(req, res, next), next)()
}

