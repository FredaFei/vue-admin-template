import { constantRouterMap, asyncRouterMap } from '@/router'
const permission = {
  state: {
    permissionRouters: constantRouterMap,
    addRoutes: []
  },
  mutations: {
    SET_ROUTERS(state, routers) {
      state.addRoutes = routers
      state.permissionRouters = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

/**
 * meta.role判断是否与当前用户权限匹配
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
function filterAsyncRouter(routes, roles) {
  const result = []
  routes.forEach(route => {
    let temp = { ...route }
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRouter(temp.children, roles)
      }
      result.push(temp)
    }
  })
  return result
}

export default permission
