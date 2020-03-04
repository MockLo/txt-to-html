const state = {
  path: ''
}

const mutations = {
  UPLOAD_FILE_MUTATION(state, filePath) {
    state.path = filePath
  }
}

const actions = {
  UPLOAD_FILE({ commit }, filePath) {
    commit('UPLOAD_FILE_MUTATION', filePath)
    // 调用main进程的读取模块进行文件读取(异步)
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('async-readFile-start', filePath)
  }
}

export default {
  state,
  mutations,
  actions
}
