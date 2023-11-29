import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

// 前置守卫
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nProgress.start()
  // 判断有无token
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')// 中转到主页
      // 执行后者守卫
      nProgress.done()
    } else {
      // 判断是否获取资料
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()// 放过
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nProgress.done()
    }
  }
})

// 后置守卫
router.afterEach((to, from) => {
  nProgress.done()
})
