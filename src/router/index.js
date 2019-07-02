import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const Index = () => import('@/router/index/Index')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
