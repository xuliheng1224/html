/**
 * Created by Administrator on 2017/8/24/024.
 */
module.exports = function (date) {
  var t = Date.parse(date)
  if (!isNaN(t)) {
    return new Date(Date.parse(date.replace(/-/g, '/')))
  } else {
    return new Date()
  }
}
