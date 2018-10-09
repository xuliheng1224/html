var http = require('http')// http://www.codingke.com/v/405-course
var querystring = require('querystring') 
var postData = querystring.stringify({
  "question[title]": null,
  "question[content]": "<p>666</p>",
  "question[courseId]": "405",
  "question[lessonId]": "9493",
  "_csrf_token": "338818e56f5c79985477747842fe491099d9cd99"
})

var options = {
  hostname: 'www.codingke.com',
  port: 80,
  path: '/ajax/create/course/question',
  method: 'POST',
  headers: {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Connection": "keep-alive",
    "Content-Length": "175",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": "visitor_type=old; tgw_l7_route=ba4a4fa767ccc5ac6060ead23a114820; PHPSESSID=p9focudmmuajd079gvrbate2f5; Hm_lvt_7d5fe787f1dd300413ad4b53656dc0b1=1537177359; UM_distinctid=165e6e912f868b-02654a7939f499-1135685c-1fa400-165e6e912f929; 53gid2=10396349393004; 53gid0=10396349393004; 53gid1=10396349393004; 53revisit=1537177359663; 53kf_72165667_from_host=www.codingke.com; 53kf_72165667_land_page=http%253A%252F%252Fwww.codingke.com%252F; kf_72165667_land_page_ok=1; 53uvid=1; onliner_zdfq72165667=0; 53kf_72165667_keyword=http%3A%2F%2Fwww.codingke.com%2F; CNZZDATA1256018185=1290086873-1537172020-%7C1537177169; visitor_type=old; Invite_code=314196; Hm_lpvt_7d5fe787f1dd300413ad4b53656dc0b1=1537177521",
    "Host": "www.codingke.com",
    "Origin": "http://www.codingke.com",
    "Referer": "http://www.codingke.com/v/405-course",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36",
    "X-CSRF-Token": "338818e56f5c79985477747842fe491099d9cd99",
    "X-Requested-With": "XMLHttpRequest"
  }
}

var request = http.request(options,(res)=>{
  // 设置编码格式
  res.setEncoding('utf-8')
  res.on('data',()=>{
    console.log('提交成功')
  })
  res.on('end',()=>{
    console.log('提交成功')
  })
})
request.write(postData)
request.end()