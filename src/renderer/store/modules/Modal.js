const state = {
  cfg: {}
}

const mutations = {
  OPEN_MODAL_MUTATION(state, cfg) {
    state.cfg = cfg
  },

  CLOSE_MODAL_MUTATION(state) {
    state.cfg.type = ''
  }
}

const actions = {
  OPEN_MODAL({ commit }, modalCfg) {
    return new Promise((resolve, reject) => {
      commit('OPEN_MODAL_MUTATION', {
        ...modalCfg,
        cb: {
          success: function(res) {
            commit('CLOSE_MODAL_MUTATION')
            resolve(res)
          },
          close: function() {
            commit('CLOSE_MODAL_MUTATION')
            reject('close')
          },
          failure: function() {
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
