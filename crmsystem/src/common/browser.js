/* eslint-disable */
var browser = {
  verion: function() {
    var Sys = {}
    var ua = navigator.userAgent.toLowerCase()
    var s = null
    if ((s = ua.match(/msie ([\d.]+)/)) != null) {
      Sys.ie = s[1]
    }
    if ((s = ua.match(/edge\/([\d.]+)/)) != null) {
      Sys.edge = s[1]
    }
    if ((s = ua.match(/firefox\/([\d.]+)/)) != null) {
      Sys.firefox = s[1]
    }
    if (Sys.edge == null && (s = ua.match(/chrome\/([\d.]+)/)) != null) {
      Sys.chrome = s[1]
    }
    if ((s = ua.match(/opera.([\d.]+)/)) != null) {
      Sys.opera = s[1]
    }
    if ((s = ua.match(/opr\/([\d.]+)/)) != null) {
      Sys.opera = s[1]
      Sys.chrome = null
      Sys.safari = null
    }
    if ((s = ua.match(/version\/([\d.]+).*safari/)) != null) {
      Sys.safari = s[1]
    }
    if (
      Sys.firefox == null &&
      ua.match(/windows nt ([\d.]+)/) != null &&
      (s = ua.match(/rv\:([\d.]+)/)) != null
    ) {
      Sys.ie = s[1]
    }
    if (Sys.ie) {      
      return {brow: 'IE', version: Sys.ie}
    }
    if (Sys.firefox) {
      return {brow: 'Firefox', version: Sys.firefox}
    }
    if (Sys.chrome) {
      return {brow: 'Chrome', verion: Sys.chrome}
    }
    if (Sys.opera) {
      return {brow: 'Opera', version: Sys.opera}
    }
    if (Sys.safari) {
      return {brow: 'Safari', verion: Sys.safari}
    }
    if (Sys.edge) {
      return {brow: 'Edge', version: Sys.edge}
    }
    return {brow: '', version: 0}
  }
}
module.exports = {
  browser
}
