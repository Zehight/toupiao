<script lang="ts" setup>
import { getActInfo } from '@/api/activity'
import { delRound } from '@/api/round'
const prop = defineProps(['projectId'])
const roundTab = ref(0) as any
const deleting = ref(false)
const deleted = ref(false)
const predeleted = ref(false)
const project = ref({}) as any
const roundList = ref([]) as any
const deleteRound = async (id: string) => {
  deleting.value = true;
  const data = await delRound(id) as any
  deleting.value = false;
  if (data.data == "successful") deleted.value = true;
}
const initRoundList = async (id: string) => {
  const data = await getActInfo(id) as any
  project.value = data.data
  roundList.value = project.value.roundList
  deleting.value = false;
  deleted.value = false;
}
initRoundList(prop.projectId)

</script>

<template>
  <v-tabs v-model="roundTab" align-tabs="center" color="deep-purple-accent-4" class="mt-3">
    <div v-if="!roundList.length" class="text-h4">
      请添加轮次
    </div>
    <div v-else v-for="(roundItem, index) in roundList" :key="index">
      <v-tab :value="index">{{ roundItem.name }}</v-tab>
    </div>
    <div class="d-flex justify-center ml-8 mt-4">
      <InputDialogCreateRound :projectId="projectId">添加轮次</InputDialogCreateRound>
      <v-spacer></v-spacer>
      <v-row class="ml-5">
        <v-btn color="blue-lighten-1" @click="initRoundList(projectId)">刷新轮次</v-btn>
      </v-row>
    </div>
  </v-tabs>
  <v-window v-model="roundTab" style="height: 100%;">
    <div v-for="(roundItem, index) in roundList" :key="index" class="rounded border-t">
      <v-window-item :value="index">
        <v-dialog v-model="predeleted" width="auto">
          <v-card>
            <v-card-text>
              {{ deleted ? `轮次删除成功~` : (deleting ? `正在删除` : `是否确认删除${roundItem.name}？`) }}
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="!deleted" color="primary" @click="deleteRound(roundItem.id)"
                :disabled="deleting">删除</v-btn>
              <v-btn v-if="!deleted" color="primary" @click="predeleted = false" :disabled="deleting">关闭</v-btn>
              <v-btn v-else color="primary" block @click="initRoundList(projectId); predeleted = false">确认</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="d-flex align-center pa-2">
          <span class="text-h5">{{ roundItem.name }}</span>
          <v-row class="ml-4">
            <v-btn color="red-darken-2" @click="predeleted = true">
              {{ deleting ? `正在删除` : `删除轮次` }}
            </v-btn>
          </v-row>
        </div>
        <ViewRoundCards :round-id="roundItem.id" />
      </v-window-item>
    </div>
  </v-window>
</template>