
var proxy = {
  "proxy": {
    "/crm": {
      "target": "http://fcrm.bblink.cn",
      "changeOrigin": true,
      "pathRewrite": {
        "^/crm": "/crm"
      }
    }
  }
}

module.exports = proxy