<script lang="ts" setup>
import { getActInfo } from '@/api/activity'
const prop = defineProps(['projectId'])
const roundTab = ref(0) as any
const project = ref({}) as any
const roundList = ref([
  {
    title: '华语赛区海选赛', model: '海选赛', groups: [{
      title: '参赛选手', characters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN', 'OTNIG', 'ASAVA', 'ASDIA']
    }]
  },
  {
    title: '日语赛区海选赛', model: '海选赛', groups: [{
      title: '参赛选手', characters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN']
    }]
  },
  {
    title: '彩虹赛区海选赛', model: '海选赛', groups: [{
      title: '参赛选手', characters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN']
    }]
  },
  {
    title: '64进32', model: '正赛', groupMembers: 4, groups: [{
      title: '第一组', characters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN']
    }, {
      title: '第二组', characters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN']
    }, {
      title: '第三组', characters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN']
    }, {
      title: '第四组', characters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN']
    }]
  },
  {
    title: '32进16', model: '正赛', groupMembers: 4, groups: [{
      title: '第一组', characters: ['OTLIN', 'OTTAF', 'OTMIN']
    }, {
      title: '第二组', characters: ['OTLIN', 'OTMAY', 'OTNIG']
    }]
  },
  {
    title: '16进8', model: '正赛', groupMembers: 2, groups: [{ title: '第一组', characters: ['OTLIN', 'OTTAF'] }]
  }
]) as any
const initRoundList = async (id: string) => {
  console.log(id);
  const data = await getActInfo(id) as any
  // project.value = data.data
  // roundList.value = project.value.roundList
  console.log(roundList);
}
initRoundList(prop.projectId)

</script>

<template>
  <v-tabs v-model="roundTab" align-tabs="center" color="deep-purple-accent-4">
    <div v-for="(roundItem, index) in roundList" :key="index">
      <v-tab :value="index">{{ roundItem.title }}</v-tab>
    </div>
    <div class="d-flex justify-center ml-8 mt-3">
      <InputDialogCreateRound :projectId="projectId">添加轮次</InputDialogCreateRound>
      <v-spacer></v-spacer>
      <v-row justify="center" class="ml-5">
        <v-btn color="blue-darken-1" @click="initRoundList(projectId)">刷新</v-btn>
      </v-row>
    </div>
  </v-tabs>
  <v-window v-model="roundTab" style="height: 100%;">
    <div v-for="(roundItem, index) in roundList" :key="index" class="rounded border-t">
      <v-window-item :value="index">
        <div class="d-flex align-center pa-2">
          <span class="text-h5">{{ roundItem.title }}</span>
          <v-card-actions class="justify-center">
            <v-btn variant="tonal">推送</v-btn>
            <v-btn variant="tonal">冻结</v-btn>
          </v-card-actions>
        </div>
        <ViewRoundCards :groups="roundItem.groups"/>
      </v-window-item>
    </div>
  </v-window>
</template>