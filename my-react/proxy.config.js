
var proxy = {
  "proxy": {
    "/api": {
      "target": "http://fapi.bblink.cn", // http://www.123369.com.cn
      "changeOrigin": true,
      "pathRewrite": {
        "^/api": "/" //重写，如果请求地址后面有api则需要加api
      }
    }
  }
}

module.exports = proxy