import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrap from 'bootstrap'
import VueImageUploadCroppi from 'vue-image-upload-croppie'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("authenticate");
  },
  render: h => h(App)
}).$mount('#app')
