<script setup lang="ts">
import { useMenu } from '@/modules/store'
import { useRoute, RouteRecordName } from 'vue-router'
const menuStore = useMenu()
const route = useRoute()

interface Menu {
  title: string
  routerName?: string
  children?: Menu[]
}
// 菜单配置
const menuTree: Menu[] = [
  {
    title: '菜单一',
    children: [
      {
        title: '子菜单一',
        routerName: 'test1',
      },
      {
        title: '子菜单二',
        routerName: 'test2',
      }
    ],
  },
  {
    title: '菜单二',
    children: [
      {
        title: '子菜单三',
        routerName: 'test3',
      },
      {
        title: '子菜单四',
        routerName: 'test4',
      },
    ],
  },
]

// 把菜单生成 routerName-title 的键值对
interface MenuMap {
  [x: RouteRecordName]: string
}
const menuMap: MenuMap = {}
function setMenuRouterMap(tree: Menu[]) {
  tree.forEach((menu) => {
    const { routerName, title, children } = menu
    if (routerName) menuMap[routerName] = title
    if (children && children.length > 0) setMenuRouterMap(children)

  })
}
setMenuRouterMap(menuTree)

// 设置初始菜单
menuStore.setActive(menuMap[route.name as RouteRecordName])
function handleOpen(key: string, keyPath: string[]) {
  menuStore.addOpeneds(key)
}
function handleClose(key: string, keyPath: string[]) {
  menuStore.removeOpeneds(key)
}

// 路由变化，修改active菜单
watch(
  () => route.name,
  (routerName) => menuStore.setActive(menuMap[routerName as RouteRecordName]),
)
</script>

<template>
  <el-scrollbar class="scroll-bar">
    <el-menu
      :router="true"
      :default-active="menuStore.active"
      :default-openeds="menuStore.openeds"
      class="menu"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu
        v-for="(mainMenu, i) in menuTree"
        :key="mainMenu.title + i"
        :index="mainMenu.title"
      >
        <template #title>
          <span>{{ mainMenu.title }}</span>
        </template>
        <el-menu-item
          v-for="(subMenu, j) in mainMenu.children"
          :key="subMenu.title + j"
          :index="subMenu.title"
          :route="{ name: subMenu.routerName }"
        >
          {{ subMenu.title }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
.menu {
  height: calc(100vh - var(--header-height));
  border-right: none;
}
.scroll-bar {
  border-right: 1px solid var(--el-menu-border-color);
}
</style>
