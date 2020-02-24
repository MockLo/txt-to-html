const state = {
  cfg: {}
}

const mutations = {
  OPEN_MODAL_MUTATION(state, cfg) {
    state.cfg = cfg
  },

  CLOSE_MODAL_MUTATION(state) {
    state.cfg = {}
  }
}

const actions = {
  OPEN_MODAL({ commit }, modalCfg) {
    return new Promise((resolve, reject) => {
      commit('OPEN_MODAL_MUTATION', {
        ...modalCfg,
        cb: {
          btn: function() {
            commit('CLOSE_MODAL_MUTATION')
            resolve()
          },
          close: function() {
            commit('CLOSE_MODAL_MUTATION')
            reject()
          },
          btnRight: function(promptData) {
            commit('CLOSE_MODAL_MUTATION')
            resolve(promptData)
          },
          btnLeft: function() {
            commit('CLOSE_MODAL_MUTATION')
            reject()
          }
        }
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
