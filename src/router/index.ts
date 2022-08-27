// Vue2 use:调用的就是参数的install方法, 或者直接调用参数.Vue.prototype.$router/$route
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import Cookies from 'js-cookie'
import store from '../store/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('../views/homepage/homepage.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 动态添加路由规则（菜单&首页）
const genRoutes = () => {
  // 循环菜单对象
  const menus = store.getters.getNewMenus
  // const newRoutes:RouteRecordRaw[]  = []
  for (let key in menus) {
    const newRoute: RouteRecordRaw = {
      path: '/' + menus[key].name,
      name: menus[key].name,
      component: () => import('../views/homepage/homepage.vue'),
      redirect: '/' + menus[key].name + '/' + menus[key].children[0].name,
      children: []
    }
    for (let i = 0; i < menus[key].children.length; i++) {
      newRoute.children?.push({
        path: menus[key].children[i].name,
        name: menus[key].children[i].name,
        component: () => import(`../views/${menus[key].name}/${menus[key].children[i].name}.vue`),
      })
    }
    // 动态添加路由规则(4个)
    router.addRoute(newRoute)
  }
  // 动态添加路由首页
  router.addRoute({
    path: '/',
    name: 'homepage',
    component: () => import('../views/homepage/homepage.vue'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/index/index.vue'),
      }
    ]
  })
}

// 前置导航守卫
router.beforeEach(async (to, from, next) => {
  const token = Cookies.get('token')
  // 1. 刷新 ----> 有token & menus(权限列表)为空
  if (token && store.state.menus.length === 0) {
    await store.dispatch('getAdminInfo')  // actions是异步
    genRoutes()
    next(to.fullPath) // 刷新 -> 第二次的时候已有menus走else
  } else if (token && store.state.menus.length !== 0 && from.path === '/login' && to.path === '/homepage') {
    // 2. 第一次登录
    genRoutes()
    next('/')
  } else if (!token && to.path !== '/login') {
    // 3. 没登陆去其它页面
    next('/login')
  } else if (token && to.path === '/login') {
    // 4. 登录了还去登录页面
    next(from)
  } else {
    next()
  }
})

export const initRouter = (app: App<Element>) => {
  app.use(router)
}

export default router