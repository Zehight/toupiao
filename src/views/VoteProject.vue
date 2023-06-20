<script setup lang="ts">
import logo from '@/assets/logo.png'
import test from '@/assets/OTLIN01.png'

const tab = ref(1)
const items = [
  {title: '海选赛'},
  {title: '64进32'},
  {title: '32进16'},
  {title: '16进8'}]

const cardList = [
  {title: '中国组', role: ['111', '222', '333', '111', '222', '333']},
  {title: '日本组', role: ['111', '222', '333', '111', '222', '333', '111', '222', '333']},
  {title: '英语组', role: ['111', '222', '333', '111', '222', '333', '111', '222']}]
</script>


<template>
  <TheContainer>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab :value="1">第一届V萌</v-tab>
      <v-tab :value="2">第二届V萌</v-tab>
      <v-tab :value="3">第三届V萌</v-tab>
    </v-tabs>
    <div class="d-flex justify-center ma-3 mt-6">
      <v-btn size="large" elevation="2">添加轮次</v-btn>
    </div>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-list>
          <v-list-item
            v-for="(circleItem,index) in items" :key="index" class=" rounded border-t">
            <v-list-item-title class="d-flex align-center pa-2">
              <span class="text-h5">{{ circleItem.title }}</span>
              <v-btn class="ml-3" elevation="0" variant="outlined">投入角色</v-btn>
            </v-list-item-title>
            <v-card elevation="0" class="pa-3 ma-3 ">
              <v-card-actions class="justify-center">
                <v-btn variant="tonal">推送</v-btn>
                <v-btn variant="tonal">冻结</v-btn>
              </v-card-actions>
              <template v-slot:text>
                <v-list rounded-0>
                  <v-list-item v-for="item in cardList" :key="item" class="pa-0">
                    <v-card :title="item.title" variant="tonal" class=" ma-2 pa-0">
                      <div class="d-flex flex-wrap">
                        <v-col v-for="(role,roleIndex) in item.role" :key="role" cols="12" lg="2" md="3" sm="4" xs="6">
                          <div class="w-100 position-relative elevation-2 rounded" style="padding-top: 150%;">
                            <v-img cover class="position-absolute w-100 h-80 pa-2"
                                   style="top:0;left: 0;right: 0;bottom: 10%"
                                   v-if="roleIndex%2===1"
                                   :src="test"></v-img>
                            <v-img cover class="position-absolute w-100 h-80 pa-2"
                                   style="top:0;left: 0;right: 0;bottom: 10%"
                                   v-if="roleIndex%2===0"
                                   :src="logo"></v-img>
                            <text cover class="position-absolute w-100 h-80 pa-2"
                                  style="top:90%;left: 0;right: 0;bottom: 0%"
                                  v-if="roleIndex%2===0">{{ role }}
                            </text>
                            <text cover class="position-absolute w-100 h-80 pa-2"
                                  style="top:90%;left: 0;right: 0;bottom: 0%"
                                  v-if="roleIndex%2===1">{{ role }}
                            </text>
                          </div>

                        </v-col>
                      </div>
                    </v-card>
                  </v-list-item>
                </v-list>
              </template>
            </v-card>
          </v-list-item>
        </v-list>
      </v-window-item>
      <v-window-item style="height: 100px" :value="2">
        asd
      </v-window-item>
      <v-window-item style="height: 100px" :value="3">
        ggg
      </v-window-item>
    </v-window>
  </TheContainer>
</template>

<style scoped>


</style>
