var http = require('http')
var add = require('./util')
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
  var str = add(2, 3).toString()
  res.write(str)
  res.end()
}).listen(1224)