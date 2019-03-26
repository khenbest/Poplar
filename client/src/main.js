import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import bootstrap from 'bootstrap'
import Croppa from 'vue-croppa'
import Axios from 'axios'
Vue.use(Croppa)

Vue.config.productionTip = false

let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

auth.get('authenticate')
  .then(res => {
    store.commit("setUser", res.data)
    // @ts-ignore
    new Vue({
      router,
      store,
      Croppa,
      render: h => h(App)
    }).$mount('#app')
  })
  .catch(err => {
    console.error(err)
    router.push({ name: "login" })
  })

