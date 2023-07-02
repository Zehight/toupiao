import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import launchRouterGuard from './routerGuard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/project',
    name: 'Project',
    component: () => import('@/views/VoteProject.vue'),
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import('@/views/VoteRole.vue'),
  },
  {
    path: '/',
    redirect: {
      name: 'Role'
    }
  },
]

const router = createRouter({
  // baseFolder('/context/') should be same with the base value in vite.config.ts 
  history: createWebHistory('/'),
  routes,
  // 只有一级路由可以使用
  scrollBehavior(to: any, from: any, savedPosition: any) {
    // keep-alive 的组件，保留滚动位置
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
})

launchRouterGuard(router)

export default router
