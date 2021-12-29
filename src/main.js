import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
