/**
 * Created by moersing on 20/05/2017.
 * @description  操作浏览器cookie
 */
export default {
    /**
     * @desc  获取浏览器cookie
     * @param {string} name - a cookie name
     * */
   getCookie(_name){
        var cookie = document.cookie;
        var arr = cookie.split("; ")
        for(var i=0;i<arr.length;i++){
            var newArr = arr[i].split("=");
            if(newArr[0]==_name){
                return newArr[1];
            }
        }
    },
    /**
     * @desc 设置浏览器cookie
     * @param {string} name - a cookie name
     * @param {string} value  - a cookie value
     * @param {object} [options] - an optional the cookie option
     * */
    setCookie(_name,_val,expires){
        var d = new Date();
        d.setDate(d.getDate()+expires);
        document.cookie = _name+"="+encodeURIComponent(_val)+";expires="+d.toGMTString();
    },
    /**
     * @desc 移除浏览器cookie
     * @desc {string} [name] - 移除的cookie的key,如果没有传,则清空所有
     * */
    removeCookie(_name,_val){
        setCookie(_name,_val,-1)
    }
}

