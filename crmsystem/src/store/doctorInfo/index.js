import * as types from './mutationsType'
import * as actions from './actions'
const state = () => ({
  doctorinfo: {}
})
const mutations = {
  [types.DOCTORINFO] (state, result) {
    state.doctorinfo = result
  }
}
export default {
  actions,
  state,
  mutations
}
