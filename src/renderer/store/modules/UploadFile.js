const state = {
  path: ''
}

const mutations = {
  UPLOAD_FILE_MUTATION(state, filePath) {
    state.path = filePath
  },

  DEL_FILE_MUTATION(state) {
    state.path = ''
  }
}

const actions = {
  UPLOAD_FILE({ commit }, filePath) {
    commit('UPLOAD_FILE_MUTATION', filePath)
  }
}

export default {
  state,
  mutations,
  actions
}
