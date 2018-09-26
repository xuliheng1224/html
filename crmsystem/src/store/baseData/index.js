import * as types from './mutationsType'
import * as actions from './actions'
const state = () => ({
  data: {},
  tjData: {}
})
const mutations = {
  [types.HIGHTDAN] (state, result) {
    state.data = result
  },
  [types.USERDATA] (state, result) {
    state.tjData = result
  }
}
export default {
  actions,
  state,
  mutations
}
