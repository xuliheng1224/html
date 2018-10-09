import { GETTOKEN_REQUEST, GETTOKEN_SUCCESS, GETTOKEN_FAIL } from '../actions/getToken'
let initState = {
  code: 0,
  message: '',
  data: {}
}

export default function reducer(state = initState, action) {
  switch (action.type) {                
      case GETTOKEN_SUCCESS:
          return {
              code: action.result.data
          };
      case GETTOKEN_FAIL: {
          return {
          }
      };
      default:
          return state;
  }
}