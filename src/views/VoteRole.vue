<script lang="ts" setup>
import { getRoleList, getRoleInfo } from '@/api/role'
interface roleData {
  id: string
  name: string
  originalName?: string
  code: string
  zone: string
  official: string
  frontImgs: string[]
}
const roleList = ref([] as roleData[])
const initedList = ref(false)
const updateRoleList = async () => {
  const data = await getRoleList() as any
  roleList.value = data.list
  initedList.value = true
}
updateRoleList()
</script>


<template>
  <TheContainer v-slot="container" :update-role="updateRoleList">
    <v-window width="100%">
      <v-btn color="blue-darken-1" variant="text" @click="updateRoleList">
        刷新
      </v-btn>
      <v-card v-if="initedList" class="ma-0 pa-0" width="100%">
        <template v-slot:title>
        </template>
        <v-list class="d-flex flex-wrap" rounded-0 width="100%">
          <v-list-item v-for="(chara, charaIndex) in roleList" :key="charaIndex" class="ma-0 pa-0 roleInfoCard">
            <RoleInfoCard v-if="chara.frontImgs.length" :roleInfo="chara" :update="updateRoleList"></RoleInfoCard>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-else>
        <h1>加载中</h1>
      </v-card>
    </v-window>
  </TheContainer>
</template>



<style lang="scss" scoped>
.roleInfoCard {
  width: 16.6%;

  @media screen and (max-width: 640px) {
    width: 50%;
  }

  @media screen and (min-width: 640px) and (max-width: 1024px) {
    width: 33%;
  }

  @media screen and (min-width: 1024px) and (max-width: 1440px) {
    width: 25%;
  }

  @media screen and (min-width: 1440px) and (max-width: 1980px) {
    width: 20%;
  }
}
</style>




