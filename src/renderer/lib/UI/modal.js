import ModalVue from '../../components/UI/Notice/Modal.vue'

const Modal = {
  install: function(Vue) {
    /**
     * 展示alert
     * @param {string} msg 信息
     * @param {object} options 其他控制参数
     * @param {string} [options.title] 标题
     * @param {string} [options.btnText] 按钮文字
     * @returns {Promise}
     */
    Vue.prototype.$alert = function(msg = '', options = {}) {
      let { title = '提示', btnText = '确定' } = options
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('OPEN_MODAL', { type: 'alert', msg, title, btnText })
          .then(
            () => resolve(),
            () => reject()
          )
          .catch(e => console.log(e))
      })
    }

    /**
     * 展示confirm
     * @param {string} msg 信息
     * @param {object} options 其他控制参数
     * @param {string} [options.title] 标题
     * @param {string} [options.btnRightText] 右按钮文字
     * @param {string} [options.btnLeftText] 左钮文字
     * @returns {Promise}
     */
    Vue.prototype.$confirm = function(msg = '', options = {}) {
      let { title = '提示', btnRightText = '确定', btnLeftText = '取消' } = options
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('OPEN_MODAL', { type: 'confirm', msg, title, btnRightText, btnLeftText })
          .then(
            () => resolve(),
            _act => reject(_act)
          )
          .catch(e => console.log(e))
      })
    }

    /**
     * 展示prompt
     * @param {string} msg 信息
     * @param {object} options 其他控制参数
     * @param {string} [options.title] 标题
     * @param {string} [options.btnRightText] 右按钮文字
     * @param {string} [options.btnLeftText] 左钮文字
     * @param {RegExp} [options.pattern] 匹配模式
     * @param {string} [options.errMsg] 匹配错误提示
     * @returns {Promise}
     */
    Vue.prototype.$prompt = function(msg = '', options = {}) {
      let {
        title = '提示',
        btnRightText = '确定',
        btnLeftText = '取消',
        pattern = /^.*$/,
        errMsg = '格式不正确',
        previewText = ''
      } = options
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('OPEN_MODAL', {
            type: 'prompt',
            msg,
            title,
            btnRightText,
            btnLeftText,
            pattern,
            errMsg,
            previewText
          })
          .then(
            promptData => resolve(promptData),
            _act => reject(_act)
          )
          .catch(e => console.log(e))
      })
    }

    Vue.component(ModalVue.name, ModalVue)
  }
}

export default Modal
