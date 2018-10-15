import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']
/**
 * meta.role判断是否与当前用户权限匹配
 */
function hasPermission(roles, route) {
  if(roles.indexOf('admin')>=0)return true
  if(!route)return true
  return roles.some(role=>route.indexOf(role)>=0)
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('getUserInfo')
          .then(res => {
            const { roles } = res.data
            // 根据roles权限生成可访问的路由表
            store.dispatch('generateRoutes', { roles }).then(() => {
              console.log(store.getters.addRoutes)
              router.addRoutes(store.getters.addRoutes)
              next({ ...to, replace: true })
            })
          })
          .catch(err => {
            store.dispatch('fedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
      } else {
        // 动态改变权限
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/404', replace: true, query: { noGoBack: true } })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
