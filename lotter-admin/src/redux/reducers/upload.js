import { UPLOAD_IMG_REQUEST, UPLOAD_IMG_SUCCESS, UPLOAD_IMG_FAIL } from '../actions/upload'
let initState = {
  code: 0,
  message: '',
  data: {}
}

export default function reducer(state = initState, action) {
  switch (action.type) {
      case UPLOAD_IMG_SUCCESS:
          return {
              code: {url: 'http://image.bblink.cn/' + action.result.data.key}
          };
      case UPLOAD_IMG_FAIL: {
          return {
          }
      };
      default:
          return state;
  }
}