import * as types from './mutationType'
import * as actions from './actions'
const state = () => ({
  loadState: false
})
const mutations = {
  [types.LOADING] (state, result) {
    state.loadState = result.load
  }
}
export default {
  actions,
  state,
  mutations
}
