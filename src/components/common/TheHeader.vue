<script setup lang="ts">
import { SwitchButton, BellFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="the-header flex">
    <div class="flex">
      <span style="cursor: pointer" @click="router.push({name:'HomePage'})">投票后台管理</span>
    </div>
    <div class="flex">
      <el-icon class="logout-icon">
        <SwitchButton/>
      </el-icon>
      <span class="logout-btn">退出登录</span>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.the-header {
  padding: 0 16px;
  height: var(--header-height);
  background: var(--primary-color);
  color: #fff;
  cursor: default;
}

.logo-icon {
  margin-right: 4px;
  width: 60px;
}

.logo-icon + span {
  position: relative;
  top: 2px;
}

.logout-icon {
  margin: 0 4px 0 32px;
  cursor: pointer;
}

.logout-btn {
  cursor: pointer;
}

.bell-icon {
  font-size: 24px;
}

.popover-item {
  padding: 8px 16px 8px 8px;
  cursor: pointer;
  color: #606266;
  text-decoration: none;
}

.popover-item > span:last-of-type {
  color: #e6a23c;
}

.popover-item:hover {
  background: #f2f6fc;
}
</style>
