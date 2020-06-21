import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体
import './assets/fonts/iconfont.css'
import 'jquery/dist/jquery.js'
// 导入Materialize
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'
// 导入VueAwesomeSwiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// elementUI
import 'element-ui/lib/theme-chalk/display.css'
// 导入scrollreveal
import 'scrollreveal'
// 导入vue-infinite-scroll
import infiniteScroll from 'vue-infinite-scroll'
// 导入vue-particles
import VueParticles from 'vue-particles'
// 导入 NProgress 包对应的JS和CSS
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import 'wowjs/css/libs/animate.css'
// 导入axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://192.168.0.104:8001/api/'
// axios.defaults.baseURL = 'http://39.106.111.206:8001/api/'
// 在 request 拦截器中，展示进度条 Nprogress.start()
axios.interceptors.request.use(config => {
  Nprogress.start()
  // 在最后必须 return config
  return config
})
// 在 response 拦截器中， 隐藏进度条 Nprogress.done()
axios.interceptors.response.use(config => {
  Nprogress.done()
  return config
})
Vue.prototype.$http = axios

Vue.use(infiniteScroll)
Vue.use(VueParticles)

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.filter('dateFormatToDate', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')

  return `${y}-${m}-${d}`
})

new Vue({
  router,
  store,
  VueAwesomeSwiper,
  render: h => h(App)
}).$mount('#app')
