<script lang="ts" setup>
const prop = defineProps(['roundItem', 'images', 'names'])

</script>

<template>
  <v-card class="pa-0 ma-0 " elevation="0">
    <template v-slot:text>
      <v-list rounded-0>
        <v-list-item v-for="(groupItem, groupIndex) in roundItem.groups" :key="groupIndex" class="mt-2">
          <v-card variant="tonal" class=" ma-0 pa-0">
            <template v-slot:title>
              <div class="d-flex">{{groupItem.title}}<InputDialogAddCharacter>投入角色</InputDialogAddCharacter></div>
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