<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMenu } from '@/modules/store'
import { getActList, getActInfo } from '@/api/activity'
import { zones } from '@/data/zone'

const router = useRouter()
const menuStore = useMenu()

const drawer = ref(true)
const openTabs = ref([menuStore.active])
const selectTab = ref([menuStore.subActive])
const activities = <Array<[string, string]>>[]
interface projectData {
  id: string
  name: string
  model: string
  createTime: string
  endTime: string
  frontImgs: string[]
  remark?: string
}
const initedProjectList = ref(false)
const updateActList = async () => {
  const data = await getActList() as any
  for (let i of data.list as projectData[]) {
    menuStore.projects[i.id] = i
    activities.push([i.name, i.id])
  }
  console.log(menuStore.projects)
  initedProjectList.value = true
}
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
function changeTab({ value, id: newTabs }: { value: boolean, id: string }) {
  if (value === false) return
  if (newTabs === 'tabs1' && initedProjectList) {
    selectTab.value = [activities[0][1]]
    changeStore([activities[0][1]])
  }
  if (newTabs === 'tabs2') {
    selectTab.value = ['NIJ']
    changeStore([zones.NIJ.abbr])
  }
}
function changeStore([e]: string[]) {
  menuStore.setSubActive(e)
  if (/v_moe/.test(e)) {
    router.push({ name: 'Project' })
  }
}
updateActList()
</script>

<template>
  <v-layout style="overflow: hidden" class="window">
    <v-app-bar color="pink-lighten-4" height="60" title="test">
      <template v-slot:prepend>
        <div class="text-h5" style="cursor: pointer;user-select: none;" @click="drawer = !drawer"> 三</div>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" disable-resize-watcher>
      <v-list @update:opened="changeRouter" @update:selected="changeStore" @click:open="changeTab"
        v-model:opened="openTabs" v-model:selected="selectTab" density="comfortable" open-strategy="single" mandatory>
        <v-list-group value="tabs1">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" class="justify-center pa-2" height="80" color="indigo" rounded="sm">
              <v-list-item-title class="text-h5">全部活动</v-list-item-title>
            </v-list-item>
          </template>
          <InputDialogCreateActivity class="mt-0 mb-3">创建活动</InputDialogCreateActivity>
          <v-list-item v-for="({ id, name }, value, i) in menuStore.projects" class="justify-center pa-2" color="blue"
            :key="i" :value="id" :title="name"></v-list-item>
        </v-list-group>
        <v-list-group value="tabs2">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" class="justify-center pa-2" height="80" color="indigo" rounded="sm">
              <v-list-item-title class="text-h5">全部角色</v-list-item-title>
            </v-list-item>
          </template>
          <InputDialogCreateCharacter class="mt-0 mb-3">创建角色</InputDialogCreateCharacter>
          <v-list-item v-for="({ name, abbr }, value, i) in zones" class="justify-center pa-2" color="blue" :key="i"
            :value="abbr" :title="name"></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="container">
      <slot v-if="initedProjectList" :store="menuStore"></slot>
    </v-main>
  </v-layout>
</template>

<style scoped>
.window {
  -webkit-user-select: none;
  user-select: none;
}
</style>