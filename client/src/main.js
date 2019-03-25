import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrap from 'bootstrap'
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

