<script lang="ts" setup>
import { fileUrl } from '@/api/file'
import { zones } from '@/data/zone'
import { officials } from '@/data/official'
const prop = defineProps(['roleInfo'])
</script>

<template>
  <v-card class="pa-0 ma-0 h-100" elevation="0">
    <template v-slot:text>
      <ConfigDialogRole :roleInfo="roleInfo">
        <NewRoleCard :data-image="fileUrl(roleInfo.frontImgs[0])" class="ma-0 pa-0" :roleInfo="roleInfo">
          <template #header>
            <h1> {{ roleInfo.name }}</h1>
          </template>
          <template #content>
            <p style="line-height: 20px;margin-top: 33%">
              所属赛区：{{ zones[roleInfo.zone].name }}<br>
              所属企划：{{ officials[roleInfo.official].name }}
            </p>
          </template>
        </NewRoleCard>
      </ConfigDialogRole>
    </template>
  </v-card>
</template>

<style lang="scss" scoped>
.card-info h1 {
  font-size: 36px;
  width: 20vw;
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