//获取最大值
function getMax(){
	var max = arguments[0];
	for(var i=0;i<arguments.length;i++){
		if(max<=arguments[i]){
			max=arguments[i]
		}
	}
	return max;
}

//获取最小值
function getMin(){
	var min =arguments[0];
	for(var i=0;i<arguments.length;i++){
		if(min>=arguments[i]){
			min=arguments[i]
		}
	}
	return min;
}

//随机数 n小于m
function random1Num(n,m){
	return parseInt(n+Math.random()*(m-n+1));
}

//打乱随机排序

function random1Number(arr){
	arr.sort(function(){
		return 0.5-Math.random();
	})

	return arr;
}

//返回最大值   传入的参数是数组
function getMax(arr){
	var max = arr[0];
	for(var i=0;i<arr.length;i++){
		if(max<arr[i]){
			max=arr[i]
		}
	}
	return max;
}

//返回最小值   传入的参数是数组
function getMin(arr){
	var min = arr[0];
	for(var i=0;i<arr.length;i++){
		if(min>arr[i]){
			min=arr[i]
		}
	}
	return min;
}

//返回最大值的下标  传入的是数组
function getMaxIndex(arr){
	var max = arr[0];
	var index;
	for(var i=0;i<arr.length;i++){
		if(max<arr[i]){
			max=arr[i]
			index=i;
		}
	}
	return index;
}

//返回最小下标  传入的是数组
function getMinIndex(arr){
	var min = arr[arr.length-1];
	var index=arr.length-1;
	for(var i=0;i<arr.length;i++){
		if(min>arr[i]){
			min=arr[i];
			index=i;
		}
	}
	return index;
}

//冒泡排序  传入的是数组
function bubbling(arr){
	var temp;
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]>arr[j+1]){
				temp = arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;

			}
		}
	}
	return arr;
}

//选择排序 传入的是数组
function selectSort(arr){
	var temp;
	for(var i=0;i<arr.length-1;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
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
function has(arr,n){
	for(var i in arr){
		if(arr[i]===n){
			return true;
		}
	}
	return false;
}

//数组去重
function norepeat(arr){
	var newArr = [];
	for(var i in arr){
		if(!has(newArr,arr[i])){
			newArr.push(arr[i])
		}
	}
	return newArr;
}

//数组插入 按照原来顺序排序
function sort1Arr(arr,n){			
	for(var i=0;i<arr.length;i++){
		if(arr[arr.length-1]<n){
		arr.push(n);
		}else if(arr[i]>n){
		arr.splice(i,0,n);
		break;
		}
		}
	return arr	
}
//验证码  6位数的验证码
function authCode(){
	var str = '';
	while(str.length<6){
		var num = randomNum(48,122)
	
		if((num>57&&num<65)||(num>90&&num<97)){
			num = randomNum(48,122)
		}else{
			str+=''+String.fromCharCode(num)
		}
		
	}
	return str
}

//随机颜色
function randomColor(){
	var R = random1Num(0,255)
	var G = random1Num(0,255)
	var B = random1Num(0,255)
	return "#"+string2Num(R,G,B) 
}
//转换为16进制不足补0
function string2Num(r,g,b){
	r = r.toString(16).length<2?"0"+r.toString(16):r.toString(16);
	g = g.toString(16).length<2?"0"+g.toString(16):g.toString(16);
	b = b.toString(16).length<2?"0"+b.toString(16):b.toString(16);
	return r+g+b;
}

//将时间对象转换成字符串
function date2String(d,sign){
	if(sign==undefined){
		sign="/"
	}

	return d.getFullYear()+sign+addzero((d.getMonth()+1))+sign+addzero(d.getDate())+" "+addzero(d.getHours())+":"+addzero(d.getMinutes())+":"+addzero(d.getSeconds());
}
//当数字不足两位的时候补0  应用于时间对象
function addzero(num){
	var str = ""+num;
	return str.length<2?"0"+str:str;
}
//获取id元素
function $(id){
	var id = id.slice(1,id.length)
   return document.getElementById(id)
}
//获取非行间样式
//ele:对象
//attr:属性
function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele,false)[attr]
	}
}
//隐藏
function hide(ele){
	ele.style.display="none";
}
//显示
function show(ele){
	ele.style.display="block";
}
//获取设置自定义属性
function attr(ele,type,val){
	if(arguments.length<2){return};

	if(arguments.length==2){
		return ele.getAttribute(type);
	}

	ele.setAttribute(type,val);
}
//获取到前一个兄弟节点(元素)
function prevChild(ele) {
	 return ele.previousElementSibling;
}
//获取当前元素距离页面的距离
function offset(ele){
	var obj = {};
	obj.l = ele.offsetLeft;
	obj.t = ele.offsetTop;

	while(ele.offsetParent){
		var ele = ele.offsetParent;
		obj.l+=ele.offsetLeft;
		obj.t+=ele.offsetTop;
	}
	return obj;
}

//阻止浏览器默认行为
function prevent(e){
	e.preventDefault?e.preventDefault():e.returnValue = false;
}

//事件监听
//第一次参数:对象
//第二个参数：事件类型
//第三个参数：回调函数
//第四个参数：是否捕获
function attach(ele,type,fn,bool){
	if(!bool){
		bool=false;
	}
	if(ele.addEventListener){
		ele.addEventListener(type,fn,bool)
	}else{
		ele.attachEvent("on"+type,fn)
	}
}

//阻止事件冒泡
function cancel(e){
	e.stopPropagetion?e.stopPropagetion():e.cancelBubble = true;
}

//设置cookie
function setCookie(_name,_val,expires){
	var d = new Date();
	d.setDate(d.getDate()+expires);
	document.cookie = _name+"="+_val+";expires="+d.toGMTString();
}

//获取cookie
function getCookie(_name){
	var cookie = document.cookie;
	var arr = cookie.split("; ")
	for(var i=0;i<arr.length;i++){
		var newArr = arr[i].split("=");
		if(newArr[0]==_name){
			return newArr[1];
		}
	}
}

//删除cookie
function removeCookie(_name,_val){
	setCookie(_name,_val,-1)
}
//获取className 无兼容性问题  
//父级元素
//class类名
function getClassName(parent,aClass){
	//获取到父元素底下所有的子元素
	var aEle = parent.getElementsByTagName('*');
	var arr = [];
	//匹配传进来的这个字符是不是一个边界符
	var reg = new RegExp('\\b'+aClass+'\\b');
	for(var i=0;i<aEle.length;i++){
		if(reg.test(aEle[i].className)){
			arr.push(aEle[i])
		}
	}
	return arr;
}

//完美运动框架
function move(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;
		for(var attr in json){
			var iCur = 0;
			if(attr=='opacity'){
				iCur = parseInt(parseFloat(getStyle(obj,attr))*100)
			}else{
				iCur = parseInt(getStyle(obj,attr))
			}

			if(iCur!=json[attr]){
				bStop=false;
			}


			var speed = (json[attr]-iCur)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);

			
			if(attr=='opacity'){
				obj.style.opacity = (iCur+speed)/100;
				obj.style.filter = 'alpha(opacity:'+(iCur+speed)+')'
			}else{
				obj.style[attr]=iCur+speed+'px';
			}
		}

		if(bStop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},30)
}
