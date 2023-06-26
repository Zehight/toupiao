<script setup lang="ts">
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <router-view v-slot="{ Component }">
    <!-- 需要使用 include 优化 缓存策略 -->
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path"></component>
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.path"></component>
  </router-view>
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
}

::-webkit-scrollbar-track {
  background: rgba(70, 40, 30, 0.15);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(75, 90, 210, 0.45);
  transition: color 0.2s ease;
}
</style>


