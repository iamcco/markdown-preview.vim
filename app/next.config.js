
module.exports = {
  pageExtensions: [ 'jsx' ],
  exportPathMap: async function () {
    return {
      '/': { page: '/' }
    }
  }
}

