const mutations = {
  modify (state, size) {
    state.size = size
  },
  add (state, msg) {
    let a = {
      text: msg
    }
    state.list.push(a)
  }
}

export default mutations
