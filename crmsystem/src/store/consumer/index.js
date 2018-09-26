import * as types from './mutationType'
import * as actions from './actions'
const state = () => ({
  userlist: {},
  userInfos: {},
  antens: {},
  schools: {},
  tangs: {},
  bcs: {},
  sugars: {},
  partums: {}
})
const mutations = {
  [types.USERLIST] (state, result) {
    state.userlist = result
  },
  [types.USERINFOS] (state, result) {
    state.userInfos = result
  },
  [types.ANTENATAL] (state, result) {
    state.antens = result
  },
  [types.SCHOOLS] (state, result) {
    state.schools = result
  },
  [types.TANGS] (state, result) {
    state.tangs = result
  },
  [types.BC] (state, result) {
    state.bcs = result
  },
  [types.SUGARS] (state, result) {
    state.sugars = result
  },
  [types.PARTUMS] (state, result) {
    state.partums = result
  }
}
export default {
  actions,
  state,
  mutations
}
