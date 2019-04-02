// 引入mockjs
import Mock from 'mockjs'
// import loginAPI from './login'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
// Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
// Mock.XHR.prototype.send = function() {
//   if (this.custom.xhr) {
//     this.custom.xhr.withCredentials = this.withCredentials || false
//   }
//   this.proxy_send(...arguments)
// }

// 登陆相关
// Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/user$/, 'get', loginAPI.getUserInfo)
// Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/auth\.*/, 'get', loginAPI.getTicket)

export default Mock
