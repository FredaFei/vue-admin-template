import http from '@/utils/http'

export function login(username, password) {
  return http.post({ url: '/user/login', data: { username, password } })
}
export function getInfo(token) {
  return http.get({ url: '/user/info', params: { token } })
}
export function logout() {
  return http.post({url: '/user/logout'})
}
