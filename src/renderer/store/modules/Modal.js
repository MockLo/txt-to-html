const state = {
  crtType: '',
  cfg_alert: {},
  cfg_confirm: {},
  cfg_prompt: {}
}

// const getters = {
//   crtCfg: state => state[`cfg_${state.crtType}`]
// }

const mutations = {
  OPEN_ALERT(state, cfg) {
    state.crtType = 'alert'
    state.cfg_alert = { ...cfg }
  },

  OPEN_CONFIRM(state, cfg) {
    state.crtType = 'confirm'
    state.cfg_confirm = { ...cfg }
  },

  OPEN_PROMPT(state, cfg) {
    state.crtType = 'prompt'
    state.cfg_prompt = { ...cfg }
  },

  CLOSE_MODAL(state) {
    let type = `cfg_${state.crtType}`
    state[type] = {}
    state.crtType = ''
  }
}

const actions = {
  OPEN_MODAL({ commit }, modalCfg) {
    let { type } = modalCfg
    return new Promise((resolve, reject) => {
      commit(`OPEN_${type.toUpperCase()}`, {
        ...modalCfg,
        cb: {
          btn: function() {
            commit('CLOSE_MODAL')
            resolve()
          },
          close: function() {
            commit('CLOSE_MODAL')
            reject()
          },
          btnRight: function(promptData) {
            commit('CLOSE_MODAL')
            resolve(promptData)
          },
          btnLeft: function() {
            commit('CLOSE_MODAL')
            reject()
          }
        }
      })
    })
  },

  CLOSE_MODAL({ commit }, status) {
    return commit('CLOSE_MODAL', status)
  }
}

export default {
  state,
  mutations,
  actions
}
