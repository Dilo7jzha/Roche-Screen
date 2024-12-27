import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import "./app.css"
import { detectZoom } from './detectZoom.js'
const m = detectZoom();
document.body.style.zoom = 100 / Number(m);

Vue.config.productionTip = false

import Global from './utils/Global'
Vue.mixin(Global)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')