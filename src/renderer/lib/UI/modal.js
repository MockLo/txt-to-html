import ModalVue from '../../components/UI/Notice/Modal.vue'

const Modal = {
  install: function(Vue) {
    /**
     * 展示alert
     * @param {string} msg 信息
     * @param {object} options 其他控制参数
     * @param {string} [options.title] 标题，默认“提示”
     * @param {string} [options.successText] 按钮文字，默认“确定”
     * @param {function} [options.close] 点击关闭的回调
     * @param {function} [options.success] 点击按钮的回调
     */
    Vue.prototype.$alert = function(msg = '', options = {}) {
      let { title = '提示', successText = '确定', close, success } = options
      this.$store
        .dispatch('OPEN_MODAL', { type: 'alert', msg, title, successText })
        .then(
          () => success && success(),
          () => close && close()
        )
        .catch(e => console.log(e))
    }

    /**
     * 展示confirm
     * @param {string} msg 信息
     * @param {object} options 其他控制参数
     * @param {string} [options.title] 标题，默认“提示”
     * @param {string} [options.successText] 右按钮文字，默认“确定”
     * @param {string} [options.failureText] 左按钮文字，默认“取消”
     * @param {function} [options.close] 点击关闭的回调
     * @param {function} [options.success] 点击右按钮的回调
     * @param {function} [options.failure] 点击左按钮的回调
     */
    Vue.prototype.$confirm = function(msg = '', options = {}) {
      let { title = '提示', successText = '确定', failureText = '取消', close, success, failure } = options
      this.$store
        .dispatch('OPEN_MODAL', { type: 'confirm', msg, title, successText, failureText })
        .then(
          () => success && success(),
          _act => (_act === 'close' ? close && close() : failure && failure())
        )
        .catch(e => console.log(e))
    }

    /**
     * 展示prompt
     * @param {string} msg 信息
     * @param {object} options 其他控制参数
     * @param {string} [options.title] 标题，默认“提示”
     * @param {string} [options.successText] 右按钮文字，默认“确定”
     * @param {string} [options.failureText] 左按钮文字，默认“取消”
     * @param {string} [options.previewText] 输入框里预先展示的文字
     * @param {RegExp} [options.pattern] 匹配模式
     * @param {string} [options.errMsg] 匹配错误提示，默认“格式不正确”
     * @param {function} [options.close] 点击关闭的回调
     * @param {function} [options.success] 点击右按钮的回调
     * @param {function} [options.failure] 点击左按钮的回调
     */
    Vue.prototype.$prompt = function(msg = '', options = {}) {
      let {
        title = '提示',
        successText = '确定',
        failureText = '取消',
        pattern,
        errMsg = '格式不正确',
        previewText,
        close,
        success,
        failure
      } = options
      this.$store
        .dispatch('OPEN_MODAL', { type: 'prompt', msg, title, successText, failureText, pattern, errMsg, previewText })
        .then(
          promptData => success && success(promptData),
          _act => (_act === 'close' ? close && close() : failure && failure())
        )
        .catch(e => console.log(e))
    }

    Vue.component(ModalVue.name, ModalVue)
  }
}

export default Modal
