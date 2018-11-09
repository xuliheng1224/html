// 使用promise 
// post方式
export function  post(url,data){
       
 	return new Promise((resolve,reject)=>{
            
	fetch(url,{
    
                method:'POST',
 
               headers:{
 
                  'Content-type':'application/json'
  
              },
               
	 body:JSON.stringify(data)
            })
 .then( res => res.json())
 .then( data => resolve(data))
.catch(err => reject(err))
  })
 }

// 调用
http.post('http://jsonplaceholder.typicode.com/users',data)
        .then(data => console.log(data))
        .catch(err => console.log(err))


export function _get(url, params) {
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
    } else {
        url += '&' + paramsArray.join('&')
    }
  }
  var result = fetch(_url + url, {
      method: 'GET',
      headers: {
          token: token,
          'Content-Type': 'application/json',
      }})
  return result;  
}

export function _post(url, formdata) {
  var result = fetch(_url + url, {
    method:"POST",
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      token: token
    },
    body:formdata
  })
  return result; 
}

export function _put(url, formdata) {
  var result = fetch(_url + url, {
    method:"PUT",
    headers:{
      // 'Content-Type':'application/x-www-form-urlencoded',
      token: token
    },
    body:formdata
  })
  return result; 
}

export function _delete(url){
  // console.log(id)
  var result = fetch(_url + url, {
    method:"DELETE",
    headers:{
      // 'Content-Type':'application/json',
      token: token
    }
  })
  return result;
}

// 表单提交：post 
Object.keys(values).forEach((key) => {
          if (!values[key]) {
            delete values[key]
          }
        })
        console.log(values)
        let formdata = Object.keys(values).map(key=>encodeURIComponent(key)+'='+encodeURIComponent(values[key])) .join('&');
_post('/canal-instance', formdata).then((res)=>{
          return res.json()
        }).then((res)=>{
            // 请求到的数据
            console.log(res)
            if (res.success) {
              _this.props.history.push('/server/canal')
            } else {
              message.error(res.msg)
            }
        })

// put ：
Object.keys(values).forEach((key) => {
          if (!values[key]) {
            delete values[key]
          }
        })
        let formdata = new FormData();
        formdata.append('id',_this.props.match.params.id)
        Object.keys(values).forEach(key => formdata.append(key,values[key]))
        _put('/canal-instance',formdata).then((res)=>{
          return res.json()
        }).then((res)=>{
            // 请求到的数据
            console.log(res)
            if (res.success) {
              _this.props.history.push('/server/canal')
            } else {
              message.error(res.msg)
            }
        })