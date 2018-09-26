import * as types from './mutationsType'
import * as actions from './actions'
const state = () => ({
  data: {}
})
const mutations = {
  [types.ADDCOURSE] (state, result) {
    state.data = result
  }
}
export default {
  actions,
  state,
  mutations
}
