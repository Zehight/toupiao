<script lang="ts" setup>
const prop = defineProps(['roundTab', 'items', 'subActive'])

</script>

<template>
  <v-tabs v-model="roundTab" align-tabs="center" color="deep-purple-accent-4">
    <div v-for="(roundItem, index) in items[subActive as keyof typeof items]" :key="index">
      <v-tab :value="index">{{ roundItem.title }}</v-tab>
    </div>
    <div class="d-flex justify-center ml-8 mt-5">
      <InputDialogCreateRound>添加轮次</InputDialogCreateRound>
    </div>
  </v-tabs>
</template>