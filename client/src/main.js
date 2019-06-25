import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import popperjs from 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Croppa from 'vue-croppa'
import Axios from 'axios'
import MQ from 'vue-mq'
import VueResizeText from 'vue-resize-text'
import './registerServiceWorker'

Vue.use(Croppa)
Vue.use(VueResizeText)

Vue.config.productionTip = false

Vue.use(MQ, {
  breakpoints: {
    xs: 575.98,
    sm: 767.98,
    md: 991.98,
    lg: 1199.98
  }
})

let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

auth.get('authenticate')
  .then(res => {
    store.commit("setUser", res.data)
  })
  .catch(err => {
    console.error(err)
    router.push({ name: "login" })
  })
  .finally(err => {
    // @ts-ignore
    new Vue({
      router,
      store,
      Croppa,
      mounted() {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
        store.dispatch("getPosts")
      },
      render: h => h(App)
    }).$mount('#app')
  })
