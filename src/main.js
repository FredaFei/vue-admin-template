// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import svgIcom from '@/components/svgIcon/index'
Vue.component('svg-icon', svgIcom)

import 'normalize.css/normalize.css'
import '@/style/index.scss'

// todo mock请求数据
import './mock'
import '@/permission'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
