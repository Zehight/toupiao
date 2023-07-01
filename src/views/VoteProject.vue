<script lang="ts" setup>

</script>


<template>
  <TheContainer v-slot="containerProps">
    <v-window v-if="containerProps.store.projects&&containerProps.store.projects[containerProps.store.subActive]" v-model="containerProps.store.subActive">
      <v-window-item v-for="(items,value,i) in containerProps.store.projects" :value="value">
        <ViewRoundWindow :project-id="items.id"></ViewRoundWindow>
      </v-window-item>
    </v-window>
    <div v-else><h1>加载中</h1></div>
  </TheContainer>
</template>

<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

body {
  margin: 40px 0;
  font-size: 14px;
  font-weight: 500;
  background-color: #BCAAA4;
  -webkit-font-smoothing: antialiased;
}

</style>
