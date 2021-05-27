import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// import echarts from 'echarts'

// * as 变量名 代表所以的变量 对象形式
import * as directives from './directives'
import '@/icons' // icon
import '@/permission' // permission control

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'iGWj5M9uG22wbXbtcWKuV7dPLpKQBqrl'
})

// 全局挂在echarts
// Vue.prototype.$echarts = echarts

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 循环对象用es6的Object.keys() 返回的是一个数组
// console.log(Object.keys(directives))
// console.log(directives)
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
