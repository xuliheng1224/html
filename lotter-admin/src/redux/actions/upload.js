export const UPLOAD_IMG_REQUEST = 'UPLOAD_IMG_REQUEST'
export const UPLOAD_IMG_SUCCESS = 'UPLOAD_IMG_SUCCESS'
export const UPLOAD_IMG_FAIL = 'UPLOAD_IMG_FAIL'

export function uploadImg (file, token) {
  var params = new FormData()
  params.append('file', file.originFileObj)
  params.append('token', token)
  return {
    types: [UPLOAD_IMG_REQUEST, UPLOAD_IMG_SUCCESS, UPLOAD_IMG_FAIL],
    promise: client => client.post(`http://upload.qiniu.com`, params),
    // afterSuccess: (dis, state, result) => {
    //   callBack()
    // }
  }
}