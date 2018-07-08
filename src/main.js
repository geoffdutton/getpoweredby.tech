import Vue from 'vue'
import vueBulmaComponents from 'vue-bulma-components'
import App from './App.vue'
import router from './router'
import store from './store'

require('bulma/css/bulma.css')

Vue.config.productionTip = false
Vue.use(vueBulmaComponents)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
