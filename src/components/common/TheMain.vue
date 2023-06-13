<template>
  <el-scrollbar class="scroll-bar">
    <el-main class="main-container">
      <slot/>
    </el-main>
  </el-scrollbar>
</template>

<style scoped>
.main-container {
  max-width: 1536px;
  margin: auto;
  min-width: 1200px;
}

.scroll-bar {
  flex: 1;
  height: calc(100vh - var(--header-height));
}
</style>
