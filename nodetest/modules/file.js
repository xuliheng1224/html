var fs = require('fs')
module.exports = {
  readFile:function (file, res){
    fs.readFile(file,'utf-8',(err, data)=>{
      res.writeHead(200, {"Content-type": "text/html;charset=utf-8"})
      res.write(data)
      res.end()
    })
  },
  readImg:function (file, res){
    fs.readFile(file,'binary',(err, data)=>{
      res.writeHead(200, {"Content-type": "image/jpeg"})
      res.write(data,'binary')
      res.end()
    })
  }
}