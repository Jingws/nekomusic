// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import { List, Popup, PullRefresh, Swipe, SwipeItem } from 'vant'

Vue.config.productionTip = false
Vue.use(List).use(Popup).use(PullRefresh).use(Swipe).use(SwipeItem)

/* eslint-disable no-new */
Vue.component('v-icon', Icon)
new Vue({
  el: '#app',
  store,
  router,
  Icon,
  components: { App },
  template: '<App/>'
})
