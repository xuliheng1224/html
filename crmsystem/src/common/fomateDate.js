/**
 * Set Date to string
 * @param {date} Date
 * @param {number1} num
 * @param {number2} num
 * @return time
 *import formateDate from '../../utils/fomateDate'
 */

/* eslint-disable */
module.exports = function (value, number1, number2) {
  let date = new Date(value)
  let year =  date.getFullYear()
  let month =  (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  let data =  date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let time = year + '-' + month + '-' + data + ' ' + hours + ':' + minutes + ':' + seconds
  switch (arguments.length) {
  	case 1: return time;
  	case 2: return time.substring(0, arguments[1]);
  	case 3: return time.substring(arguments[1], arguments[2])
  }
}