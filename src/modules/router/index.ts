import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useKAComponent } from '@/modules/store'
import launchRouterGuard from './routerGuard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: 'test1'}
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import('@/views/menu1/test1.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('@/views/menu1/test2.vue')
  },
  {
    path: '/test3',
    name: 'test3',
    component: () => import('@/views/menu2/test3.vue')
  },
  {
    path: '/test4',
    name: 'test4',
    component: () => import('@/views/menu2/test4.vue')
  },
]

// 二级目录，vite.config.ts base 配置的值。默认的全局变量
const base = import.meta.env.BASE_URL

const router = createRouter({
  // baseFolder('/context/') should be same with the base value in vite.config.ts 
  history: createWebHistory(base),
  routes,
  // 只有一级路由可以使用
  scrollBehavior(to: any, from: any, savedPosition: any) {
    const store = useKAComponent()
    // keep-alive 的组件，保留滚动位置
    if (savedPosition && store.components.includes(to.name)) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
})

launchRouterGuard(router)

export default router
