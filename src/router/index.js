import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "about1" */ '../views/Index.vue'),
    meta: { title: '席巴商城 -Index' },
    redirect: '/home',
    children:[
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about1" */ '../views/home/VE.vue'),
        meta: { title: '席巴商城 -首页' }
      },
      {
        path: '/product',
        name: 'product',
        component: () => import(/* webpackChunkName: "about2" */ '../views/product/VE.vue'),
        meta: { title: '席巴商城 -商品详情' }
      },
      {
        path: '/backend',
        name: 'backend',
        component: () => import(/* webpackChunkName: "about2" */ '../views/backend/VE.vue'),
        meta: { title: '席巴商城 -商品详情' }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "about3" */ '../views/user/Index.vue'),
        meta: { title: '席巴商城 -用户' },
        redirect: '/user/info',
        children:[
          {
            path: 'regis',
            name: 'userregis',
            component: () => import(/* webpackChunkName: "about3" */ '../views/user/regis/VE.vue'),
            meta: { title: '席巴商城 -用户注册' },
            beforeEnter: (to, from, next) => { //已登录跳转info
              if(store.state.IsLogin)next('/user/info');
              else next();
            },
          },
          {
            path: 'info',
            name: 'userinfo',
            component: () => import(/* webpackChunkName: "about3" */ '../views/user/info/VE.vue'),
            meta: { title: '席巴商城 -用户信息' },
            beforeEnter: (to, from, next) => { //未登录跳转login
              if(!store.state.IsLogin)next('/user/login');
              else next();
            },
          },
          {
            path: 'login',
            name: 'userlogin',
            component: () => import(/* webpackChunkName: "about3" */ '../views/user/login/VE.vue'),
            meta: { title: '席巴商城 -用户登录' },
            beforeEnter: (to, from, next) => { //已登录跳转info
              if(store.state.IsLogin)next('/user/info');
              else next();
            },
          },
          {
            path: 'buylist',
            name: 'userbuylist',
            component: () => import(/* webpackChunkName: "about3" */ '../views/user/buylist/VE.vue'),
            meta: { title: '席巴商城 -用户购物车' },
            beforeEnter: (to, from, next) => { //未登录跳转login
              if(!store.state.IsLogin)next('/user/login');
              else next();
            },
          },
          {
            path: 'historylist',
            name: 'userhistorylist',
            component: () => import(/* webpackChunkName: "about3" */ '../views/user/historylist/VE.vue'),
            meta: { title: '席巴商城 -用户历史订单' },
            beforeEnter: (to, from, next) => { //未登录跳转login
              if(!store.state.IsLogin)next('/user/login');
              else next();
            },
          },
        ]
      },
      {
        path: '/other',
        name: 'other',
        component: () => import(/* webpackChunkName: "about3" */ '../views/other/Index.vue'),
        meta: { title: '席巴商城 -其他' },
        children:[
          {
            path: 'VETa',
            name: 'VETa',
            component: () => import(/* webpackChunkName: "about3" */ '../views/other/VETa.vue'),
            meta: { title: '席巴商城 -VETa' },
          }
        ]
      },
      {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "about3" */ '../views/other/VE404.vue'),
        meta: { title: '席巴商城 -404' }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/'
})

router.onError((error) => {
  // 代码来自于其他人的解决方案，只改了一下正则
  const pattern = /Loading chunk .* failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    location.reload()
  }
})

// 路由守卫？放在路由实例后面
router.beforeEach((to, from, next) => {
  // 设定标题
  if (to.meta.title) {
    document.title = to.meta.title
  }


  //404
  const { resolved } = router.resolve(to.path)
  if (resolved.matched.length) {
    next()
  } else {
    next('/404') // 没有符合的就404
  }
})   

export default router