import * as types from './mutationType'
import * as actions from './actions'
const state = () => ({
  user: {},
  menu: {}
})
const mutations = {
  [types.LOGIN] (state, result) {
    state.user = result
  },
  [types.MENU] (state, result) {
    state.menu = result
  }
}
export default {
  actions,
  state,
  mutations
}
