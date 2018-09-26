const actions = {
  add ({
    commit
  }, msg) {
    commit('add', msg)
  },
  modify ({
    commit
  }, size) {
    commit('modify', size)
  }
}

export default actions
