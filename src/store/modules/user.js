import { login, getInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    roles: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    }
  },
  actions: {
    signIn({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            let { token } = response.data
            setToken(token)
            console.log(123)
            console.log(token)
            commit('SET_TOKEN', token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(response => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data
            if (data.roles && data.roles.length > 0) {
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.name)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 动态修改权限
    changeRoles({commit,dispatch},role){
      return new Promise(resolve=>{
        commit('SET_TOKEN',role)
        setToken(role)
        getInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          dispatch('generateRoutes', data)
          resolve()
        })
      })
    },
    // 前端 登出
    fedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
