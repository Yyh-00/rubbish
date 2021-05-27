// 权限拦截在路由跳转 导航首位 路由钩子函数
// 改文件不需要导出，因为直接在main文件中引入 只需要让代码执行即可

import router from '@/router'
import store from '@/store' // 引入store实例 和组件中的this.$store是一回事
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404'] // 定义白名单
// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  // next是前置首位必须执行的钩子 next必须执行 如果不执行 页面就死了
  // next()放过
  // next(false)跳转终止
  // next(地址) 跳转到某个地址
  NProgress.start()
  if (store.getters.token && store.getters.identity) {
    // 如果有token
    if (to.path === '/login') {
      // 如果要访问的是登录页
      next('/') // 跳到主页
    } else {
      // 放行之后在获取用户信息
      // 根据vuex中的userInfo中有无userID来判断是否获取用户信息
      // if (!store.getters.userId) {
      //   // await store.dispatch('user/getInfo')
      //   // 必须等用户信息获取完毕后再放行 所以要同步
      // }
      next()
    }
  } else {
    // 没有token的情况下
    if (whiteList.indexOf(to.path) > -1) {
      // 表示 要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 手动关闭一次 解决手动切换地址时 进度条不关闭的问题
})
// 路由后置守卫
router.afterEach(() => {
  NProgress.done()
})
