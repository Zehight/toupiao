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
const filtering = ref(false)
const filterStore = ref(undefined as any)
const queryText = ref(undefined as any)
const roleList = ref([] as roleData[])
const filteredRoleList = ref([] as roleData[])
const initedList = ref(false)
const updateRoleList = async () => {
  const data = await getRoleList() as any
  roleList.value = data.list
  initedList.value = true
}
const filterRole = () => {
  if (!filtering.value) {
    return roleList.value
  }
  else {
    return roleList.value.filter(chara => {
      if (filterStore.value) {
        if (filterStore.value.subActive !== chara.zone) {
          return false
        }
      }
      if (queryText.value) {
        let qt = new RegExp(queryText.value, 'i')
        if (qt.test(chara.code)) {
          return true
        }
        if (qt.test(chara.name)) {
          return true
        }
        if (chara.originalName && qt.test(chara.originalName)) {
          return true
        }
      }
      else {
        return true
      }
      return false
    }
    )
  }
}
updateRoleList()
</script>

<template>
  <TheContainer v-slot="container" :update-role="updateRoleList">
    <v-window width="100%">
      <v-card v-if="container.store && initedList" class="ma-0 pa-0" width="100%">
        <template v-slot:title>
          <v-row>
            <v-col cols="4" sm="3" lg="2" class="ml-3"><v-switch label="进一步筛选" v-model="filtering"
                @click="filterStore = container.store"></v-switch></v-col>
            <v-col v-if="filtering" cols="6" sm="5" lg="4" class="ml-3"><v-text-field label="搜索名称或代号" v-model="queryText"
                color="pink" clearable></v-text-field></v-col>
          </v-row>
        </template>
        <v-list class="d-flex flex-wrap" rounded-0 width="100%">
          <v-list-item v-for="(chara, charaIndex) in filterRole()" :key="charaIndex" class="ma-0 pa-0 roleInfoCard">
            <RoleInfoCard v-if="chara.frontImgs.length" :roleInfo="chara" :update="updateRoleList"
              :filter="[filtering, queryText]"></RoleInfoCard>
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




