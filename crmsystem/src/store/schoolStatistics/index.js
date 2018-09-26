import * as types from './mutationType'
import * as actions from './actions'
const state = () => ({
  textstatistics: {},
  curriculumstatistics: {},
  lecturerstatistics: {},
  userstatistics: {}

})
const mutations = {
  [types.TEXTSTATISTICS] (state, result) {
    state.textstatistics = result
  },
  [types.CURRICULUMSTATISTICS] (state, result) {
    state.curriculumstatistics = result
  },
  [types.LECTURERSTATISTICS] (state, result) {
    state.lecturerstatistics = result
  },
  [types.USERSTATISTICS] (state, result) {
    state.userstatistics = result
  }
}
export default {
  actions,
  state,
  mutations
}
