import Mock from 'mockjs'
import loginApi from './login'

Mock.mock(/\/user\/login/, 'post', loginApi.loginByUsername)
Mock.mock(/\/user\/info/, 'get', loginApi.getUserInfo)
Mock.mock(/\/user\/logout/, 'post', loginApi.logout)

export default Mock
