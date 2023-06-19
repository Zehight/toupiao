<script lang="ts" setup>
const props = defineProps(['height'])
</script>


<template>
  <v-virtual-scroll
    :height="props.height"
    :items="['']"
  >
    <template v-slot:default="{ item }">
      {{ item }}
      <slot/>
    </template>
  </v-virtual-scroll>
</template>


<style scoped>

</style>