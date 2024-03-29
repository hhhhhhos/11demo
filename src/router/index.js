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
            path: 'info',
            name: 'userinfo',
            component: () => import(/* webpackChunkName: "about3" */ '../views/user/info/VE.vue'),
            meta: { title: '席巴商城 -用户信息' },

          },
          {
            path: 'buylist',
            name: 'userbuylist',
            component: () => import(/* webpackChunkName: "about3" */ '../views/user/buylist/VE.vue'),
            meta: { title: '席巴商城 -用户购物车' },

          },
          {
            path: 'buylist_result',
            name: 'userbuylist_result',
            component: () => import(/* webpackChunkName: "about3" */ '../views/user/buylist_result/VE.vue'),
            meta: { title: '席巴商城 -用户购物车结算' },
          },
          {
            path: 'historylist',
            name: 'userhistorylist',
            component: () => import(/* webpackChunkName: "about3" */ '../views/user/historylist/VE.vue'),
            meta: { title: '席巴商城 -用户历史订单' },
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
  },
  {
    path: '/login',
    name: 'logIn',
    component: () => import(/* webpackChunkName: "about3" */ '../views/LogIn.vue'),
    meta: { title: '席巴商城 -用户登录' },

  },
  {
    path: '/gotopay',
    name: 'gotopay',
    component: () => import(/* webpackChunkName: "about3" */ '../views/gotopay.vue'),
    meta: { title: '席巴商城 -跳转支付' },

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
  console.error('Navigation error:', error.message);
})

// 路由守卫？放在路由实例后面
// 跳转前做点事
router.beforeEach((to, from, next) => {
  // 提醒自己不要死循环
  console.log(to.path)
  console.log(from.path)
  console.log("不要无限跳转")
  // 设定标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 前端登录跳转
  const allowedPaths = ['/login', '/product','/home'];
  // login
  if(!store.state.IsLogin && !allowedPaths.includes(to.path)){
    next('/login')
  }
    
  

  //404
  const { resolved } = router.resolve(to.path)
  if (resolved.matched.length) {
    next()
  } else {
    next('/404') // 没有符合的就404
  }
}) 

// 在完成路由跳转后执行一些逻辑
router.afterEach((to, from) => {

  // 示例：输出一条日志
  console.log(`Navigated from ${from.path} to ${to.path}`);
  
  // 在这里可以执行其他需要在路由跳转后进行的操作
});


export default router