<script lang="ts" setup>
import test from '@/assets/OTLIN01.png'
import OTLIN from '@/assets/chara/OTLIN01.png'
import OTMAY from '@/assets/chara/OTMAY01.png'
import OTMIN from '@/assets/chara/OTMIN01.png'
import OTNIG from '@/assets/chara/OTNIG01.png'
import OTTAF from '@/assets/chara/OTTAF01.png'

const images = {
  charas: { OTLIN, OTMAY, OTMIN, OTNIG, OTTAF } as any,
  chara: (id: string) => images.charas[id] ? images.charas[id] : test,
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
const tab = ref(1)
const roundTab = ref(0)
const items = [
  { title: '华语赛区海选赛', model: '海选赛', allCharacters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN', 'OTNIG', 'ASAVA', 'ASDIA'] },
  { title: '日语赛区海选赛', model: '海选赛', allCharacters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN'] },
  { title: '彩虹赛区海选赛', model: '海选赛', allCharacters: ['OTLIN', 'OTMAY', 'OTTAF', 'OTMIN'] },
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
  { title: '16进8', model: '正赛', groupMembers: 2, groups: [{ title: '第一组', characters: ['OTLIN', 'OTTAF'] }] }]

</script>


<template>
  <TheContainer>
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
      <v-tab :value="1">第一届V萌</v-tab>
      <v-tab :value="2">第二届V萌</v-tab>
      <v-tab :value="3">第三届V萌</v-tab>
    </v-tabs>
    <div class="d-flex justify-center ma-3 mt-6">
      <InputDialogCreateRound>添加活动</InputDialogCreateRound>
    </div>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-tabs v-model="roundTab" align-tabs="center" color="deep-purple-accent-4">
          <div v-for="(roundItem, index) in items" :key="index">
            <v-tab :value="index">{{ roundItem.title }}</v-tab>
          </div>
        </v-tabs>
        <v-window v-model="roundTab">
          <div v-for="(roundItem, index) in items" :key="index" class="rounded border-t">
            <v-window-item :value="index">
              <div class="d-flex align-center pa-2">
                <span class="text-h5">{{ roundItem.title }}</span>
                <InputDialogAddCharacter v-if="roundItem.model == '海选赛'">投入角色</InputDialogAddCharacter>
                <InputDialogAddGroup v-else :members="roundItem.groupMembers || 4">添加组别</InputDialogAddGroup>
                <v-card-actions class="justify-center">
                  <v-btn variant="tonal">推送</v-btn>
                  <v-btn variant="tonal">冻结</v-btn>
                </v-card-actions>
              </div>
              <v-card v-if="roundItem.model == '正赛'" class="pa-0 ma-0 " elevation="0">
                <template v-slot:text>
                  <v-list rounded-0>
                    <v-list-item v-for="groupItem in roundItem.groups" :key="groupItem" class="pa-0">
                      <v-card :title="groupItem.title" variant="tonal" class=" ma-2 pa-0">
                        <div class="d-flex flex-wrap">
                          <v-col v-for="(chara, charaIndex) in groupItem.characters" :key="chara" cols="12" lg="2" md="3"
                            sm="4" xs="6">
                            <div class="w-100 position-relative elevation-2 rounded" style="padding-top: 150%;">
                              <v-img cover class="position-absolute w-100 h-80 pa-2"
                                style="top:0;left: 0;right: 0;bottom: 10%" :src="images.chara(chara)"></v-img>
                              <text cover class="position-absolute w-100 h-80 pa-2"
                                style="top:90%;left: 0;right: 0;bottom: 0%">{{ chara }}
                              </text>
                            </div>
                          </v-col>
                        </div>
                      </v-card>
                    </v-list-item>
                  </v-list>
                </template>
              </v-card>
              <v-card v-else-if="roundItem.model == '海选赛'" class="pa-0 ma-0 " elevation="0">
                <template v-slot:text>
                  <v-list rounded-0>
                    <v-list-item class="pa-0">
                      <v-card title="参赛选手" variant="tonal" class=" ma-2 pa-0">
                        <div class="d-flex flex-wrap">
                          <v-col v-for="(chara, charaIndex) in roundItem.allCharacters" :key="chara" cols="12" xl="2"
                            lg="2" md="3" sm="5">
                            <NewRoleCard :data-image="images.chara(chara)" :data-name="names.chara(chara)">
                              <template #header>
                                <h1> {{ names.chara(chara) }}</h1>
                              </template>
                              <template #content>
                                <p style="line-height: 20px;margin-top: 20px">
                                  所属赛区：中国赛区<br>
                                  所属企划：Asoul
                                </p>
                              </template>
                            </NewRoleCard>
                            <!-- <div class="w-100 position-relative elevation-2 rounded" style="padding-top: 150%;">
                              <v-img cover class="position-absolute w-100 h-80 pa-2"
                                style="top:0;left: 0;right: 0;bottom: 10%"
                                :src="images.chara(chara)"></v-img>
                              <text cover class="position-absolute w-100 h-80 pa-2"
                                style="top:90%;left: 0;right: 0;bottom: 0%">{{ chara }}
                              </text>
                            </div> -->
                          </v-col>
                        </div>
                      </v-card>
                    </v-list-item>
                  </v-list>
                </template>
              </v-card>
            </v-window-item>
          </div>
        </v-window>
      </v-window-item>
      <v-window-item style="height: 100px" :value="2">
        asd
      </v-window-item>
      <v-window-item :value="3" style="height: 100px">
        ggg
      </v-window-item>
    </v-window>
  </TheContainer>
</template>

<style lang="scss" scoped>
.cardArea {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

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

  @media screen and (max-width: 1024px) {
    font-size: 28px;
    line-height: 28px;
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
