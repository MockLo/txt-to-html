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
    return new Promise(resolve => {
      commit('OPEN_MODAL_MUTATION', {
        ...modalCfg,
        cb: {
          btn: function() {
            commit('CLOSE_MODAL_MUTATION')
            resolve('btn')
          },
          close: function() {
            commit('CLOSE_MODAL_MUTATION')
            resolve('close')
          },
          btnRight: function(res) {
            commit('CLOSE_MODAL_MUTATION')
            resolve(res)
          },
          btnLeft: function() {
            commit('CLOSE_MODAL_MUTATION')
            resolve('btnLeft')
          }
        }
      })
    }).catch(err => console.log(err))
  }
}

export default {
  state,
  mutations,
  actions
}
