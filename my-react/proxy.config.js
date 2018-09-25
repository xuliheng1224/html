
var proxy = {
  "proxy": {
    "/api": {
      "target": "http://fapi.bblink.cn",
      "changeOrigin": true,
      "pathRewrite": {
        "^/crm": "/crm"
      }
    }
  }
}

module.exports = proxy