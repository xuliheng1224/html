
var tool = {
  dateFormat: function (dateTime) {
    Date.prototype.Format = function (fmt) {
      var o = {
        'M+' : this.getMonth()+1, //月份
        'd+' : this.getDate(), //日
        'h+' : this.getHours()%24 == 0 ? 0 : this.getHours()%24, //小时
        'H+' : this.getHours(), //小时
        'm+' : this.getMinutes(), //分
        's+' : this.getSeconds(), //秒
        'q+' : Math.floor((this.getMonth()+3)/3), //季度
        'S' : this.getMilliseconds() //毫秒
      }
      var week = {
        '0' : '/u65e5',
        '1' : '/u4e00',
        '2' : '/u4e8c',
        '3' : '/u4e09',
        '4' : '/u56db',
        '5' : '/u4e94',
        '6' : '/u516d'
      }
      if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length))
      }
      if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? '/u661f/u671f' : '/u5468') : '')+week[this.getDay()+''])
      }
      for(var k in o){
        if(new RegExp('('+ k +')').test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)))
        }
      }
      return fmt
    }
    return new Date(dateTime).Format('yyyy-MM-dd hh:mm:ss')
  },
  localStorage: {
    set: function (key, value) {
      window.localStorage.setItem(key, value)
    },
    get: function (key) {
      return window.localStorage.getItem(key)
    },
    removeAll: function () {
      return window.localStorage.clear()
    },
    remove: function (key) {
     return window.localStorage.removeItem(key)
    }
  },
  download: function (data, name, type) {
    let blob = new Blob([data], {type: type})
    var fileName = name
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName)
    } else {
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
      window.URL.revokeObjectURL(link.href)
    }
  }
}
module.exports = {
  tool
}
