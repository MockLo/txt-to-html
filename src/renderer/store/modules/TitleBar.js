const state = {
  title: '标题'
}

const mutations = {
  UPDATE_MUTATION(state, newTitle) {
    state.title = newTitle
  }
}

const actions = {
  UPDATE_TITLE({ commit }, newTitle) {
    commit('UPDATE_MUTATION', newTitle)
  }
}

export default {
  state,
  mutations,
  actions
}
