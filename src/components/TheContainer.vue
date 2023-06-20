<script lang="ts" setup>
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
    <v-app-bar color="surface-variant" height="60" title="test">
      <template v-slot:prepend>
        <div class="text-h5" style="cursor: pointer;user-select: none;" @click="drawer = !drawer"> 三</div>
      </template>
      <template v-slot:append>
        <div class="d-flex align-center">
          <v-btn v-if="menuStore.active==='1'" class="bg-white" prepend-icon="Plus" style="margin-right: 16px">创建活动
          </v-btn>
          <v-btn v-if="menuStore.active==='2'" class="bg-white" prepend-icon="Plus" style="margin-right: 16px">创建角色
          </v-btn>
        </div>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" color="surface" disable-resize-watcher>
      <div class="d-flex">
        <v-tabs
          v-model="menuStore.active"
          class="flex-1-0"
          color="primary"
          direction="vertical"
          @update:modelValue="changeRouter"
        >
          <v-tab class="justify-center text-h6" height="80" value="1">
            test1
          </v-tab>
          <v-tab class="justify-center text-h6" height="80" value="2">
            test
          </v-tab>
          <!--          <v-tab height="80" value="3" class="justify-center text-h6">-->
          <!--            test3-->
          <!--          </v-tab>-->
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