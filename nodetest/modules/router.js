var file = require('./file')
module.exports = {
  login (req, res) {
    res.writeHead(200, {"Content-type": "text/html;charset=utf-8"})
    res.write('这是登录页')
    res.end()
  },
  home (req, res) { 
    file.readFile('./view/index.html', res)
  },
  img (req, res) {
    file.readImg('./img/timg.jpg', res)
  },
  notFound(req, res) {
    res.writeHead(200, {"Content-type": "text/html;charset=utf-8"})
    res.write('这是首页')
    res.end()
  }
}