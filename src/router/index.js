import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, asyncRouterMap } from './routes'

Vue.use(Router)

export default new Router({
  routes: constantRouterMap
})
export { constantRouterMap, asyncRouterMap }
