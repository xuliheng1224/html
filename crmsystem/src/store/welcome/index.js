import * as types from './mutationType'
import * as actions from './actions'
const state = () => ({
  data: {}
})
const mutations = {
  [types.WELCOME] (state, result) {
    state.data = result
  }
}
export default {
  actions,
  state,
  mutations
}
