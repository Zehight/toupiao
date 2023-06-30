<script lang="ts" setup>
import { getActInfo } from '@/api/activity'
const prop = defineProps(['roundTab', 'projectId'])
const project = ref({}) as any
const roundList = ref([]) as any
const initRoundList = async (id: string) => {
  console.log(id);
  const data = await getActInfo(id) as any
  project.value = data.data
  roundList.value = project.value.roundList
  console.log(project.value.roundList);
}
initRoundList(prop.projectId)
</script>

<template>
  <v-tabs v-model="roundTab" align-tabs="center" color="deep-purple-accent-4">
    <div v-if="roundList">
      <div v-for="(roundItem, index) in roundList" :key="index">
        <v-tab :value="index">{{ roundItem.title }}</v-tab>
      </div>
    </div>
    <div class="d-flex justify-center ml-8 mt-5">
      <InputDialogCreateRound :projectId="projectId">添加轮次</InputDialogCreateRound>
      <v-spacer></v-spacer>
      <v-row justify="center" class="ml-5">
        <v-btn color="blue-darken-1" @click="initRoundList(projectId)">刷新</v-btn>
      </v-row>
    </div>
  </v-tabs>
</template>