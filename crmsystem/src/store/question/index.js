import * as types from './mutationType'
import * as actions from './actions'
const state = () => ({
  testQuestion: {}
})
const mutations = {
  [types.TESTQUESTION] (state, result) {
    state.testQuestion = result
  }
}
export default {
  actions,
  state,
  mutations
}
