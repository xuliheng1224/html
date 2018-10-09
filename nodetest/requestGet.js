var https = require('https')
var options = {
  hostname : 'api.douban.com',
  port: 443, // http默认的是80,
  path: '/v2/movie/top250',
  method: 'GET'
}

var request = https.request(options,(res)=>{
  var datas = ''
  res.on('data',(data)=>{
    datas += data
  })
  res.on('end',()=>{
    console.log(JSON.
      parse(datas))
    JSON.parse(datas).subjects.map((v) => {
      console.log(v.title)
    })
  })
})
request.end()