//JS控制文本框只能输入数字 \保留小数点后两位
<input type="text" placeholder="保留到小数点后两位" maxlength="200" onkeyup="num(this)" onpaste="num(this)" />
//输入和黏贴操作时触发

//小数点后两位
function num(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}

//只能输入整数
function inte(obj) {
	if (obj.value.length == 1) {
		obj.value = obj.value.replace(/[^1-9]/g, '')
	} else {
		obj.value = obj.value.replace(/\D/g, '')
	}
}

//下载pdf/excel
fetch({
	url: '/crm/user/downData',
	method: 'get',
	responseType: 'blob',
	params: {
		type: 1
	},
	success: function (res) {
		if (res.status === 200) {
			// let blob = new Blob([res.data], {type: 'application/pdf;charset=utf-8'}) pdf
			let blob = new Blob([res.data], { type: 'application/vnd.ms-excel;charset=utf-8' }) // excel
			let objectUrl = URL.createObjectURL(blob)
			window.location.href = objectUrl
		} else {
			this.$message.error(res.data.msg)
		}
	},
	fail: function (err) {
		console.log(err)
	}
}, this)

// 获取url参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2])); return null
}

/**函数的去抖动**/
function debounce(method, delay) {
	var timer = null;
	return function () {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			method();
			method.apply(context, args);
		}, delay);
	}
}
var n = 1;
function resizehandler() {
	console.log(++n);
}
window.onscroll = debounce(resizehandler, 500);

/**函数节流**/
function throttle(method, duration) {
	var begin = new Date();
	return function () {
		var context = this, args = arguments, current = new Date();
		if (current - begin >= duration) {
			method.apply(context, args);
			begin = current;
		}
	}
}

function print() {
	console.log('hello world');
}

window.onscroll = function () {
	debounce(print);
};

// 判断对象是否是空对象
function emptyObj() {
	// 怎么判断一个对象是否为空
	var obj = {}
	// 1
	function judgeOb(obj) {
		for (var a in obj) {
			return alert('非空对象')
		}
		return alert('空对象')
	}
	//2
	if (JSON.stringify(obj) == '{}') {
		console.log('空对象');
	}
	//3
	if (Object.keys(obj).length == 0) {
		console.log('空对象');
	} else {
		console.log('非空对象');
	}
}

// try,catch
function add() {
	try {
		//程序异常，就会执行catch事件
		window.a.b != alert(1)
	}
	catch{
		alert(2)
	}
}
//时间格式化：
function dateFormat(dateTime) {
	Date.prototype.Format = function (fmt) {
		var o = {
			'M+': this.getMonth() + 1, //月份
			'd+': this.getDate(), //日
			'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
			'H+': this.getHours(), //小时
			'm+': this.getMinutes(), //分
			's+': this.getSeconds(), //秒
			'q+': Math.floor((this.getMonth() + 3) / 3), //季度
			'S': this.getMilliseconds() //毫秒
		}
		var week = {
			'0': '/u65e5',
			'1': '/u4e00',
			'2': '/u4e8c',
			'3': '/u4e09',
			'4': '/u56db',
			'5': '/u4e94',
			'6': '/u516d'
		}
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		if (/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[this.getDay() + ''])
		}
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
			}
		}
		return fmt
	}
	return new Date(dateTime).Format('yyyy-MM-dd hh:mm:ss')
}
//获取最大值
function getMax() {
	var max = arguments[0];
	for (var i = 0; i < arguments.length; i++) {
		if (max <= arguments[i]) {
			max = arguments[i]
		}
	}
	return max;
}

//获取最小值
function getMin() {
	var min = arguments[0];
	for (var i = 0; i < arguments.length; i++) {
		if (min >= arguments[i]) {
			min = arguments[i]
		}
	}
	return min;
}

//随机数 n小于m
function random1Num(n, m) {
	return parseInt(n + Math.random() * (m - n + 1));
}

//打乱随机排序
function random1Number(arr) {
	arr.sort(function () {
		return 0.5 - Math.random();
	})
	return arr;
}

//返回最大值的下标  传入的是数组
function getMaxIndex(arr) {
	var max = arr[0];
	var index;
	for (var i = 0; i < arr.length; i++) {
		if (max < arr[i]) {
			max = arr[i]
			index = i;
		}
	}
	return index;
}

//返回最小下标  传入的是数组
function getMinIndex(arr) {
	var min = arr[arr.length - 1];
	var index = arr.length - 1;
	for (var i = 0; i < arr.length; i++) {
		if (min > arr[i]) {
			min = arr[i];
			index = i;
		}
	}
	return index;
}

//冒泡排序  传入的是数组
function bubbling(arr) {
	var temp;
	for (var i = 0; i < arr.length - 1; i++) {
		for (var j = 0; j < arr.length - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;

			}
		}
	}
	return arr;
}

//选择排序 传入的是数组
function selectSort(arr) {
	var temp;
	for (var i = 0; i < arr.length - 1; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i] > arr[j]) {
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}
//数组判断是否有某个值
//传入的值是一个数组  n是一个字符
function has(arr, n) {
	for (var i in arr) {
		if (arr[i] === n) {
			return true;
		}
	}
	return false;
}

//数组去重
function norepeat(arr) {
	var newArr = [];
	for (var i in arr) {
		if (!has(newArr, arr[i])) {
			newArr.push(arr[i])
		}
	}
	return newArr;
}

//数组插入 按照原来顺序排序
function sort1Arr(arr, n) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[arr.length - 1] < n) {
			arr.push(n);
		} else if (arr[i] > n) {
			arr.splice(i, 0, n);
			break;
		}
	}
	return arr
}
//验证码  6位数的验证码
function authCode() {
	var str = '';
	while (str.length < 6) {
		var num = randomNum(48, 122)
		if ((num > 57 && num < 65) || (num > 90 && num < 97)) {
			num = randomNum(48, 122)
		} else {
			str += '' + String.fromCharCode(num)
		}
	}
	return str
}

//随机颜色
function randomColor() {
	var R = random1Num(0, 255)
	var G = random1Num(0, 255)
	var B = random1Num(0, 255)
	return "#" + string2Num(R, G, B)
}
//转换为16进制不足补0
function string2Num(r, g, b) {
	r = r.toString(16).length < 2 ? "0" + r.toString(16) : r.toString(16);
	g = g.toString(16).length < 2 ? "0" + g.toString(16) : g.toString(16);
	b = b.toString(16).length < 2 ? "0" + b.toString(16) : b.toString(16);
	return r + g + b;
}

//将时间对象转换成字符串
function date2String(d, sign) {
	if (sign == undefined) {
		sign = "/"
	}
	return d.getFullYear() + sign + addzero((d.getMonth() + 1)) + sign + addzero(d.getDate()) + " " + addzero(d.getHours()) + ":" + addzero(d.getMinutes()) + ":" + addzero(d.getSeconds());
}

//获取当前元素距离页面的距离
function offset(ele) {
	var obj = {};
	obj.l = ele.offsetLeft;
	obj.t = ele.offsetTop;

	while (ele.offsetParent) {
		var ele = ele.offsetParent;
		obj.l += ele.offsetLeft;
		obj.t += ele.offsetTop;
	}
	return obj;
}

//阻止浏览器默认行为
function prevent(e) {
	e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

//事件监听
//第一次参数: 对象
//第二个参数：事件类型
//第三个参数：回调函数
//第四个参数：是否捕获
function attach(ele, type, fn, bool) {
	if (!bool) {
		bool = false;
	}
	if (ele.addEventListener) {
		ele.addEventListener(type, fn, bool)
	} else {
		ele.attachEvent("on" + type, fn)
	}
}

//阻止事件冒泡
function cancel(e) {
	e.stopPropagetion ? e.stopPropagetion() : e.cancelBubble = true;
}

//完美运动框架
function move(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var bStop = true;
		for (var attr in json) {
			var iCur = 0;
			if (attr == 'opacity') {
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100)
			} else {
				iCur = parseInt(getStyle(obj, attr))
			}

			if (iCur != json[attr]) {
				bStop = false;
			}


			var speed = (json[attr] - iCur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);


			if (attr == 'opacity') {
				obj.style.opacity = (iCur + speed) / 100;
				obj.style.filter = 'alpha(opacity:' + (iCur + speed) + ')'
			} else {
				obj.style[attr] = iCur + speed + 'px';
			}
		}

		if (bStop) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	}, 30)
}
