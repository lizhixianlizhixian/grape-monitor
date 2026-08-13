<template>
  <el-container class="layout-wrap">
    <!-- 左侧侧边栏 -->
    <el-aside width="220" class="sidebar">
      <div class="sidebar-logo">葡跃</div>
      <!-- 上半部分业务菜单区域：自动占剩余空间 -->
      <div class="menu-top">
        <router-link to="/grapeSugar" :class="{active: $route.path === '/grapeSugar'}" class="menu-item">
          甜度数据
        </router-link>
        <router-link to="/device" :class="{active: $route.path === '/device'}" class="menu-item">
          设备管理
        </router-link>
      </div>
      <!-- 下半部分固定底部：回到首页 -->
      <div class="menu-bottom">
        <div class="divider-line"></div>
        <router-link to="/intro" :class="{active: $route.path === '/intro'}" class="menu-item">
          <el-icon><House /></el-icon>
          <span style="margin-left:6px">回到首页</span>
        </router-link>
      </div>
      <!-- CSS藤蔓装饰，无图片 -->
      <div class="vine-deco"></div>
    </el-aside>
    <el-container class="main-wrap">
      <el-main class="page-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { House } from '@element-plus/icons-vue'
</script>

<style scoped>
.layout-wrap {
  height: 100vh;
}
.sidebar {
  background: #f6edf2;
  position: relative;
  overflow: hidden;
  /* 侧边栏自身开启纵向弹性布局 */
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.sidebar-logo {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #d87093;
  padding: 30px 0;
  flex-shrink: 0;
}
/* 上方菜单自动挤占剩余高度，把底部菜单挤到最下方 */
.menu-top {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 12px;
  flex: 1;
}
/* 底部区域固定贴底，不被挤压 */
.menu-bottom {
  padding: 0 12px 30px 12px;
  flex-shrink: 0;
}
.divider-line {
  width: 80%;
  height: 1px;
  margin: 10px auto 18px;
  background-color: #f0d8e0;
}
.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  padding: 14px 0;
  font-size: 19px;
  border-radius: 50px 14px 14px 50px;
  background: #e4b8cc;
  color: #fff;
  text-decoration: none;
  transition: 0.24s ease;
}
.menu-item.active {
  background: #d87093;
  transform: translateX(4px);
  box-shadow: 0 3px 10px rgba(216,112,137,0.3);
}
.menu-item:hover {
  transform: translateX(4px);
  background: #d87093;
}
/* CSS绘制藤蔓 */
.vine-deco {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 100%;
  background: radial-gradient(ellipse at 10px, rgba(180,220,180,0.4) 0%, transparent 70%);
  pointer-events: none;
}
.main-wrap {
  height: 100vh;
}
.page-content {
  padding: 0;
  overflow-y: auto;
}
</style>