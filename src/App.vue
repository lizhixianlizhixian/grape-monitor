<template>
  <!-- 路由出口，所有页面都会渲染在这里 -->
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(() => {
  // 项目初始化，读取本地缓存恢复登录状态
  userStore.restoreLogin()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>