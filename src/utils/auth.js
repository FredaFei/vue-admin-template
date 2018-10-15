import Cookies from 'js-cookie'
const tokenKey = 'admin-token'
export function getToken() {
  return Cookies.get(tokenKey)
}
export function removeToken() {
  return Cookies.remove(tokenKey)
}
export function setToken(val) {
  return Cookies.set(tokenKey, val)
}
