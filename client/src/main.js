import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import popperjs from 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Croppa from 'vue-croppa'
Vue.use(Croppa)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Croppa,
  created() {
    this.$store.dispatch("authenticate");
  },
  render: h => h(App)
}).$mount('#app')

