
var proxy = {
  "proxy": {
    "/api": {
      "target": "https://fapi.bblink.cn",
      "changeOrigin": true,
      "pathRewrite": {
        "^/api": "/api"
      }
    } 
  }
}

module.exports = proxy