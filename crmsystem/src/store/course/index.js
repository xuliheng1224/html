import * as types from './mutationType'
import * as actions from './actions'
const state = () => ({
  remindListData: {},
  signData: {},
  testList: {},
  courseDetail: {},
  useTestDetail: {},
  questionDetail: {}
})
const mutations = {
  [types.REMINDLIST] (state, result) {
    state.remindListData = result
  },
  [types.SIGNLIST] (state, result) {
    state.signData = result
  },
  [types.TESTLIST] (state, result) {
    state.testList = result
  },
  [types.COURSEDETAIL] (state, result) {
    state.courseDetail = result
  },
  [types.USETESTDETAIL] (state, result) {
    state.useTestDetail = result
  },
  [types.QUESTIONDETAIL] (state, result) {
    state.questionDetail = result
  }
}
export default {
  actions,
  state,
  mutations
}
