import axios from 'axios'

export function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'token': 12345
      },
      timeout: 30*1000
    })
    instance(options)
    .then(res=>{
      resolve(res)
      options.success(res)
    }).catch(err => {
      console.log('请求异常信息:' + err)
      reject(err)
    })
  })
}