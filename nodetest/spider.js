var https = require('https')
var url = 'https://www.lagou.com/'
// cheerio为服务器特别定制的，快速、灵活、实施的jQuery核心实现.###Introduction将HTML告诉你的服务器
var cheerio = require('cheerio')
function filters(data) {
  var $ = cheerio.load(data)
  var menu = $('.category-list')
  var menuData = []
  menu.each((i, v)=>{
    var menuTitle = $(v).find('h2').text()
    var menuList = $(v).find('a')
    var menuLists = []
    menuList.each((j, k)=>{
      menuLists.push($(k).text())
    })
    menuData.push({
      menuTitle: menuTitle,
      menuLists: menuLists
    })
  })
  return menuData
}

function menu(data){
  data.forEach((m, n)=>{
    console.log(m.menuTitle + '\n')
    m.menuLists.forEach((x, y)=>{
      console.log(x)
    })
  })
}

https.get(url,(res)=>{
  var html =''
  res.on('data',(data)=>{
    html += data
    // console.log(html)
  })
  res.on('end',()=>{
    var menuData = filters(html)
    menu(menuData)
  })
})