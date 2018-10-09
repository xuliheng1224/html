const http = require('http')
const port = 1224
const host = '127.0.0.1'

var httpServer = http.createServer((req, res) => {
  res.status = 200
  res.setHeader("Content-Type", "text/html;charset=utf-8")
  // 句柄函数
  res.write('<h2>中午吃什么</h2>')
  res.end()
})
httpServer.listen(port, host, () => {
  console.log('running at http://' + host + ':' + port)
})