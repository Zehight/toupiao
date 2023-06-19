<script setup lang="ts">
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
                      <v-row class="ma-0">
                        <v-col cols="2" v-for="role in item.role" :key="role">
                          <div class="cardArea">
                            <RoleCard :data-image="test">
                              <template #header>
                                <h1> 嘉然Diana</h1>
                              </template>
                              <template #content>
                                <p style="line-height: 20px;margin-top: 20px">
                                  所属赛区：中国赛区<br>
                                  所属企划：Asoul
                                </p>
                              </template>
                            </RoleCard>
                          </div>
                        </v-col>
                      </v-row>
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

<style scoped lang="scss">
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

.title {
  font-size: 24px;
  font-weight: 700;
  color: #5D4037;
  text-align: center;
}

.card-info h1 {
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(black, 1) -3px 0px 10px;
}

p {
  line-height: 1.5em;
}

h1 + p, p + p {
  margin-top: 10px;
}

.container {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card-wrap {
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;

  &:hover {
    .card-info {
      transform: translateY(0);
    }

    .card-info p {
      opacity: 1;
    }

    .card-info, .card-info p {
      transition: 0.6s $hoverEasing;
    }

    .card-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }

    .card-bg {
      transition: 0.6s $hoverEasing,
    }

    .card {
      transition: 0.6s $hoverEasing,
      box-shadow 2s $hoverEasing;
    }
  }
}

.normol {
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(black, 0.66) 0 3px 6px 0,
  inset #333 0 0 0 5px,
  inset rgba(white, 0.3) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.selected {
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(white, 0.2) 0 3px 6px 0,
  rgba(white, 1) 0 0 0 5px,
  rgba(black, 0.66) 0 15px 30px 0,
  inset #333 0 0 0 5px,
  inset white 0 0 0 6px;
  transition: 1s $returnEasing;
}


//.card-bg {
//  opacity: 0.5;
//  position: absolute;
//  top: -20px;
//  left: -20px;
//  width: 100%;
//  height: 100%;
//  padding: 20px;
//  background-repeat: no-repeat;
//  background-position: center;
//  background-size: cover;
//  transition: 1s $returnEasing,
//  opacity 5s 1s $returnEasing;
//  pointer-events: none;
//}

.normolBG {
  opacity: 0.5;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 1s $returnEasing,
  opacity 5s 1s $returnEasing;
  pointer-events: none;
}

.selectedBG {
  opacity: 0.9;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 1s $returnEasing,
  opacity 5s 1s $returnEasing;
  pointer-events: none;
}

.card-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  transform: translateY(50%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s $returnEasing;
  }
}


</style>
