<script lang="ts" setup>
const prop = defineProps(['roundItem', 'images', 'names'])

</script>

<template>
  <v-card v-if="roundItem.model == '正赛'" class="pa-0 ma-0 " elevation="0">
    <template v-slot:text>
      <v-list rounded-0>
        <v-list-item v-for="groupItem in roundItem.groups" :key="groupItem" class="pa-0">
          <v-card :title="groupItem.title" variant="tonal" class=" ma-2 pa-0">
            <div class="d-flex flex-wrap">
              <v-col v-for="(chara, charaIndex) in groupItem.characters" :key="chara" cols="12" lg="2" md="3" sm="4"
                xs="6">
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
              <v-col v-for="(chara, charaIndex) in roundItem.allCharacters" :key="chara" cols="12" xl="2" lg="2" md="3"
                sm="5">
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
              </v-col>
            </div>
          </v-card>
        </v-list-item>
      </v-list>
    </template>
  </v-card>
</template>