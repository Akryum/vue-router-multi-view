import Vue from 'vue'
import { router } from './router'
import VueRouterMultiView from '../../'
import App from './App.vue'

Vue.config.devtools = true;

Vue.use(VueRouterMultiView)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  ...App,
})
