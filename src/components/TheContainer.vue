<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMenu } from '@/modules/store'

const router = useRouter()
const menuStore = useMenu()

const drawer = ref(true)

function changeRouter(e: any) {
  menuStore.setActive(e)
  if (e === '1') {
    router.push({name: 'Project'})
  }
  if (e === '2') {
    router.push({name: 'Role'})
  }
}


</script>

<template>
  <v-layout style="overflow: hidden">
    <v-app-bar height="60" color="surface-variant" title="投票后台系统">
      <template v-slot:prepend>
        <div style="cursor: pointer;user-select: none;" class="text-h5" @click="drawer = !drawer"> 三</div>
      </template>
      <template v-slot:append>
        <div class="d-flex align-center">
          <v-btn style="margin-right: 16px" class="bg-white" prepend-icon="Plus" v-if="menuStore.active==='1'">创建活动
          </v-btn>
          <v-btn style="margin-right: 16px" class="bg-white" prepend-icon="Plus" v-if="menuStore.active==='2'">创建角色
          </v-btn>
        </div>
      </template>
    </v-app-bar>
    <v-navigation-drawer color="surface" disable-resize-watcher v-model="drawer">
      <div class="d-flex">
        <v-tabs
          v-model="menuStore.active"
          direction="vertical"
          color="primary"
          class="flex-1-0"
          @update:modelValue="changeRouter"
        >
          <v-tab height="80" value="1" class="justify-center text-h6">
            活动管理
          </v-tab>
          <v-tab height="80" value="2" class="justify-center text-h6">
            角色管理
          </v-tab>
          <v-tab height="80" value="3" class="justify-center text-h6">
            系统管理
          </v-tab>
        </v-tabs>
      </div>
    </v-navigation-drawer>
    <v-main class="container">
      <slot/>
    </v-main>
  </v-layout>
</template>

<style scoped>
.container {
  /*margin: auto;*/
  /*max-width: 1536px;*/
  /*min-width: 1200px;*/
}

</style>