<script lang="ts" setup>
import { getRoundInfo } from '@/api/round'
import { delGroup } from '@/api/group'
import { fileUrl } from '@/api/file'

const prop = defineProps(['roundId'])
const deleting = ref(false)
const deleted = ref(false)
const round = ref({}) as any
const groupList = ref([]) as any
const deleteGroup = async (id: string) => {
  deleting.value = true;
  const data = await delGroup(id) as any
  deleting.value = false;
  if (data.data == "successful") deleted.value = true;
}
const initGroupList = async () => {
  const data = await getRoundInfo(prop.roundId) as any
  round.value = data.data
  groupList.value = round.value.groupList
  deleting.value = false;
  deleted.value = false;
}
initGroupList()
</script>

<template>
  <v-card class="pa-0 ma-0 " elevation="0">
    <template v-slot:title>
      <v-row class="ml-5 pa-1">
        <v-btn variant="tonal" class="ma-1">推送</v-btn>
        <v-btn variant="tonal" class="ma-1">冻结</v-btn>
      </v-row>
    </template>
    <template v-slot:text>
      <v-dialog v-model="deleted" width="auto">
        <v-card>
          <v-card-text>
            组别删除成功~
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="initGroupList()">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-list rounded-0>
        <v-list-item v-for="(groupItem, groupIndex) in groupList" :key="groupIndex" class="mt-2">
          <v-card variant="tonal" class=" ma-0 pa-0">
            <template v-slot:title>
              <div class="d-flex">
                {{ groupItem.name }}
                <InputDialogAddRole :group-id="groupItem.id" :update="initGroupList">投入角色</InputDialogAddRole>
                <v-row class="ml-4 mt-1">
                  <v-btn color="red-darken-4" variant="outlined" @click="deleteGroup(groupItem.id)" :disabled="deleting">
                    {{ deleting ? `正在删除` : `删除组别` }}
                  </v-btn>
                </v-row>
              </div>
            </template>
            <div class="d-flex flex-wrap">
              <v-col v-for="(chara, charaIndex) in groupItem.roleList" :key="charaIndex" cols="12" lg="2" md="3" sm="4">
                <NewRoleCard :data-image="fileUrl(chara.frontImgs[0])">
                  <template #header>
                    <h1> {{ chara.name }}</h1>
                  </template>
                  <template #content>
                    <p style="line-height: 20px;margin-top: 20px">
                      所属赛区：中国赛区<br>
                      所属企划：Asoul
                    </p>
                  </template>
                </NewRoleCard>
              </v-col>
            </div>
          </v-card>
        </v-list-item>
      </v-list>
    </template>
    <template v-slot:actions>
      <InputDialogAddGroup :round-id="roundId" :update="initGroupList">添加组别</InputDialogAddGroup>
    </template>
  </v-card>
</template>


<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

.card-info h1 {
  font-size: 36px;
  line-height: 36px;
  padding: 1vw;
  font-weight: 700;
  text-shadow: rgba(black, 1) -3px 0px 10px;

  @media screen and (max-width: 640px) {
    font-size: 28px;
    line-height: 28px;
  }

  @media screen and (min-width: 640px) and (max-width: 1024px) {
    font-size: 30px;
    line-height: 30px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1440px) {
    font-size: 32px;
    line-height: 32px;
  }

  @media screen and (min-width: 1440px) and (max-width: 1980px) {
    font-size: 34px;
    line-height: 34px;
  }
}
</style>