import * as types from './mutationType'
export const loadingState = ({commit}, opt) => {
  commit(types.LOADING, opt)
}
