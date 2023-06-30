<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMenu } from '@/modules/store'

const router = useRouter()
const menuStore = useMenu()

const drawer = ref(true)
const openTabs = ref([menuStore.active])
const selectTab = ref([menuStore.subActive])
const activities = [
  ['V萌', 'v_moe'],
  ['V萌2', 'v_moe_2'],
  ['V萌V', 'v_moe_5'],
  ['V萌6', 'v_moe_6'],
]
const zones = [
  ['彩虹赛区', 'NIJ'],
  ['华语赛区', 'CHI'],
  ['日语赛区', 'JAP'],
  ['英语赛区', 'ENG'],
]
function changeRouter(e: Array<string>) {
  if (e.length === 0) return
  let newTabs = e[0]
  menuStore.setActive(newTabs)
  if (newTabs === 'tabs1') {
    router.push({ name: 'Project' })
  }
  if (newTabs === 'tabs2') {
    router.push({ name: 'Role' })
  }
}
function changeTab({value,id:newTabs}:{value:boolean,id:string}) {
  if (value === false) return
  if (newTabs === 'tabs1') {
    selectTab.value = [activities[0][1]]
    changeStore([activities[0][1]])
  }
  if (newTabs === 'tabs2') {
    selectTab.value = ['NIJ']
    changeStore([zones[0][1]])
  }
}
function changeStore([e]: string[]) {
  menuStore.setSubActive(e)
  if (/v_moe/.test(e)) {
    router.push({ name: 'Project' })
  }
}

</script>

<template>
  <v-layout style="overflow: hidden" class="window">
    <v-app-bar color="pink-lighten-4" height="60" title="test">
      <template v-slot:prepend>
        <div class="text-h5" style="cursor: pointer;user-select: none;" @click="drawer = !drawer"> 三</div>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" disable-resize-watcher>
      <v-list @update:opened="changeRouter" @update:selected="changeStore" @click:open="changeTab" v-model:opened="openTabs"
        v-model:selected="selectTab" density="comfortable" open-strategy="single" mandatory>
        <v-list-group value="tabs1">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" class="justify-center pa-2" height="80" color="indigo" rounded="sm">
              <v-list-item-title class="text-h5">全部活动</v-list-item-title>
            </v-list-item>
          </template>
          <InputDialogCreateActivity class="mt-0 mb-3">创建活动</InputDialogCreateActivity>
          <v-list-item v-for="([title, value], i) in activities" class="justify-center pa-2" color="blue" :key="i"
            :value="value" :title="title"></v-list-item>
        </v-list-group>
        <v-list-group value="tabs2">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" class="justify-center pa-2" height="80" color="indigo" rounded="sm">
              <v-list-item-title class="text-h5">全部角色</v-list-item-title>
            </v-list-item>
          </template>
          <InputDialogCreateCharacter class="mt-0 mb-3">创建角色</InputDialogCreateCharacter>
          <v-list-item v-for="([title, value], i) in zones" class="justify-center pa-2" color="blue" :key="i"
            :value="value" :title="title"></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="container">
      <slot :store="menuStore"></slot>
    </v-main>
  </v-layout>
</template>

<style scoped>
.window {
  -webkit-user-select: none;
  user-select: none;
}
</style>