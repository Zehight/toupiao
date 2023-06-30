<script lang="ts" setup>
import OTLIN from '@/assets/chara/OTLIN01.png'
import OTMAY from '@/assets/chara/OTMAY01.png'
import OTMIN from '@/assets/chara/OTMIN01.png'
import OTNIG from '@/assets/chara/OTNIG01.png'
import OTTAF from '@/assets/chara/OTTAF01.png'

const images = {
  charas: { OTLIN, OTMAY, OTMIN, OTNIG, OTTAF } as any,
  chara: (id: string) => images.charas[id] ? images.charas[id] : OTLIN,
}
const names = {
  noname: '未录入名称',
  charas: {
    OT: {
      LIN: '凜凜蝶凜',
      MAY: '麻尤米Mayumi',
      MIN: '明前奶绿',
      NIG: '夜王莉莉丝',
      TAF: '永雏塔菲',
    }
  } as any,
  chara: (id: string) => {
    if (names.charas[id.slice(0, 2)]) {
      return names.charas[id.slice(0, 2)][id.slice(2)] ? names.charas[id.slice(0, 2)][id.slice(2)] : names.noname
    }
    else {
      return names.noname
    }
  },
}
// const roundTab = ref(0)
const roundTab = reactive({})
const activitiesAndItems = {
  v_moe: [
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
  ]
}
</script>


<template>
  <TheContainer v-slot="containerProps">
    <v-window v-if="containerProps.store.projects&&containerProps.store.projects[containerProps.store.subActive]" v-model="containerProps.store.subActive">
      <!-- <v-window-item value="v_moe">
        <ViewRoundTabs v-model="roundTab" :round-tab="roundTab" :items="activitiesAndItems"
          :sub-active="containerProps.store.subActive" />
        <v-window v-model="roundTab">
          <div
            v-for="(roundItem, index) in activitiesAndItems[containerProps.store.subActive as keyof typeof activitiesAndItems]"
            :key="index" class="rounded border-t">
            <v-window-item :value="index">
              <div class="d-flex align-center pa-2">
                <span class="text-h5">{{ roundItem.title }}</span>
                <v-card-actions class="justify-center">
                  <v-btn variant="tonal">推送</v-btn>
                  <v-btn variant="tonal">冻结</v-btn>
                </v-card-actions>
              </div>
              <ViewRoundCards :round-item="roundItem" :images="images" :names="names" />
            </v-window-item>
          </div>
        </v-window>
      </v-window-item> -->
      <v-window-item v-for="(items,value,i) in containerProps.store.projects" style="height: 100px" :value="value">
        <ViewRoundTabs v-model="roundTab" :round-tab="roundTab" :project-id="items.id"/>
        asd
      </v-window-item>
    </v-window>
    <div v-else><h1>加载中</h1></div>
  </TheContainer>
</template>

<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

body {
  margin: 40px 0;
  font-size: 14px;
  font-weight: 500;
  background-color: #BCAAA4;
  -webkit-font-smoothing: antialiased;
}

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
