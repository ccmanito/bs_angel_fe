import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

// 引入自定义指令
import '@/components/Dialogfun/directives.js'
// import Cookies from 'js-cookie'
// import i18n from './lang' // Internationalization
import App from './App'
import router from './router'
import store from './store'
import './mock'
import '@/icons' // icon
import '@/permission' // permission control

// Vue.use(Element, {
//   size: Cookies.get('size') || 'medium', // set element-ui default size
//   i18n: (key, value) => i18n.t(key, value)
// })
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
