<script lang="ts" setup>
import { fileUrl } from '@/api/file'
const prop = defineProps(['roleInfo'])
console.log(prop)
</script>

<template>
  <v-card class="pa-0 ma-0 h-100" elevation="0" height="26.6vw" width="20vw">
    <template v-slot:text>
      <NewRoleCard :data-image="fileUrl(roleInfo.frontImgs[0])" class="ma-0 pa-0">
        <template #header>
          <h1> {{ roleInfo.name }}</h1>
        </template>
        <template #content>
          <p style="line-height: 20px;margin-top: 20px">
            所属赛区：{{ roleInfo.zone }}<br>
            所属企划：{{ roleInfo.official }}
          </p>
        </template>
      </NewRoleCard>
    </template>
  </v-card>
</template>

<style scoped>
.card-info h1 {
  font-size: 36px;
  width: 20vw;
  line-height: 36px;
  padding: 0.5vw;
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