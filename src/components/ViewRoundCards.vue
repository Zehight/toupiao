<script lang="ts" setup>
import OTLIN from '@/assets/chara/OTLIN01.png'
import OTMAY from '@/assets/chara/OTMAY01.png'
import OTMIN from '@/assets/chara/OTMIN01.png'
import OTNIG from '@/assets/chara/OTNIG01.png'
import OTTAF from '@/assets/chara/OTTAF01.png'

const prop = defineProps(['groups'])

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
</script>

<template>
  <v-card class="pa-0 ma-0 " elevation="0">
    <template v-slot:text>
      <v-list rounded-0>
        <v-list-item v-for="(groupItem, groupIndex) in groups" :key="groupIndex" class="mt-2">
          <v-card variant="tonal" class=" ma-0 pa-0">
            <template v-slot:title>
              <div class="d-flex">{{ groupItem.title }}<InputDialogAddCharacter>投入角色</InputDialogAddCharacter>
              </div>
            </template>
            <div class="d-flex flex-wrap">
              <v-col v-for="(chara, charaIndex) in groupItem.characters" :key="charaIndex" cols="12" lg="2" md="3" sm="4">
                <NewRoleCard :data-image="images.chara(chara)">
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
              </v-col>
            </div>
          </v-card>
        </v-list-item>
      </v-list>
    </template>
    <template v-slot:actions>
      <InputDialogAddGroup>添加组别</InputDialogAddGroup>
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