<script lang="ts" setup>
import { getRoleList, getRoleInfo } from '@/api/role'
import { fileUrl } from '@/api/file'
interface roleData {
  id: string
  name: string
  originalName?: string
  code: string
  zone: string
  official: string
  frontImgs: string[]
}
const roleList = ref([]) as any
const roleStore = reactive({}) as Record<string, roleData>
const initedList = ref(false)
const updateRoleList = async () => {
  const list = await getRoleList() as any
  roleList.value = list.list.filter((v: any) => v.code.replace(" ", ""))
  for (let v of roleList.value) {
    getStoreRoleInfo(v.id)
  }
  initedList.value = true
}
const getStoreRoleInfo = async (id: string) => {
  const info = await getRoleInfo(id) as any
  const data = info.data as roleData
  if (!data.code || !data.frontImgs.length) return
  if (!roleStore[data.code]) {
    roleStore[data.code] = data
  }
  console.log(data, roleStore)
  return roleStore[data.code]
}
updateRoleList()
interface chara {
  code: Uppercase<string>;
  zone: Uppercase<string>;
  name: string;
  originalName?: string;
  official: [string] | [string, string];
  imageIDs: {}[];
  history: {};
  remark?: string;
}
const characters: chara[] = [
  {
    code: 'OTLIN',
    zone: 'CHI',
    name: '凜凜蝶凜',
    official: ['OT'],
    imageIDs: ['……'],
    history: {},
  }, {
    code: 'OTMAY',
    zone: 'CHI',
    name: '麻尤米Mayumi',
    official: ['OT'],
    imageIDs: ['……'],
    history: {},
  }, {
    code: 'HEGAW',
    zone: 'ENG',
    name: '噶呜·古拉',
    originalName: 'Gawr Gura',
    official: ['HO', 'HE'],
    imageIDs: ['……'],
    history: {},
  }
]
</script>


<template>
  <TheContainer>
    <h1>全部角色</h1>
    <v-window>
      <v-btn color="blue-darken-1" variant="text" @click="updateRoleList">
        测试
      </v-btn>
    </v-window>
    <v-card variant="tonal" class="ma-0 pa-0" cols="12">
      <template v-slot:title>
        <v-list v-if="initedList" class="d-flex flex-wrap" rounded-0>
          <v-list-item v-for="(chara, charaIndex) in roleStore" :key="charaIndex">
            <v-card v-if="chara.frontImgs.length" variant="tonal" class=" ma-0 pa-0" height="26.5vw" width="20vw">
              <RoleInfoCard :roleInfo="chara"></RoleInfoCard>
            </v-card>
          </v-list-item>
        </v-list>
      </template>
    </v-card>
  </TheContainer>
</template>



<style scoped></style>




