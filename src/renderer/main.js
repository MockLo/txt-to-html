import Vue from 'vue'
import axios from 'axios'
import Modal from './lib/UI/modal'

import App from './App'
import Btn from './components/UI/Btn/Btn.vue'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Modal)
Vue.component(Btn.name, Btn)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
