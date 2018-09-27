
var proxy = {
  "proxy": {
    '/api': {
      target: 'http://fapi.bblink.cn',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  }
}

module.exports = proxy