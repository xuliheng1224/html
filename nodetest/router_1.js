var http = require('http')
var url = require('url')
var router = require('./modules/router')
http.createServer((req, res)=>{
  // req.url '/status?name=ryan'
  if(req.url != '/favicon.ico') {
    var pathname = url.parse(req.url).pathname.replace(/\//, '')
    // res.write('<head><meta charset="utf-8"/></head>')
    try{
      router[pathname](req, res)
    }catch(err){
      router['notFound'](req, res)
    }
  }
}).listen('1224', '127.0.0.1',() => {
  console.log('starting')
})