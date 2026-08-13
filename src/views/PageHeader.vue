<template>
<div class="header-box">
  <!-- 左侧品牌+导航菜单区域 -->
  <div class="nav-left">
    <span class="brand-logo">葡跃</span>
    <div class="nav-menu">
      <span class="menu-item">设备</span>
      <span class="menu-item" @click="showConsultDialog = true">咨询</span>
      <!-- 修改：点击跳转PPT详情页面 -->
      <span class="menu-item jump-bottom" @click="goToAbout">了解更多</span>
    </div>
  </div>
  <!-- 右侧登录/用户信息（沿用之前小人图标登录方案） -->
  <div class="nav-right">
    <div v-if="!userStore.isLogin" class="login-icon-btn" @click="userStore.openLoginDialog()" title="点击登录葡跃系统">
      <svg viewBox="0 0 1024 1024" width="22" height="22" fill="#d87093">
        <path d="M512 128a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 448c235.648 0 426.667 191.019 426.667 426.667v42.666H85.333v-42.666C85.333 767.019 276.352 576 512 576z" />
      </svg>
    </div>
    <div v-else class="user-info">
      <span>葡跃欢迎你，{{ userStore.roleName }}</span>
      <span class="logout" @click="handleLogout">退出登录</span>
    </div>
  </div>
  <!-- 登录弹窗 -->
 <LoginDialog v-model:visible="userStore.loginDialogVisible" @login-success="onLoginSuccess" />
  <!-- 咨询联系方式弹窗 -->
  <div v-if="showConsultDialog" class="consult-mask" @click.self="showConsultDialog = false">
    <div class="consult-card">
      <h3>联系咨询</h3>
      <p>负责人：胡锐</p>
      <p>电话：测试中暂未填入</p>
      <p>邮箱：测试中暂未填入</p>
      <button class="close-btn" @click="showConsultDialog = false">关闭</button>
    </div>
  </div>
</div>
</template>
<script setup>
/* eslint-disable vue/multi-word-component-names */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import LoginDialog from './LoginDialog.vue'
const router = useRouter()
const userStore = useUserStore()
// 控制咨询弹窗显示隐藏
const showConsultDialog = ref(false)
// 登录成功回调
const onLoginSuccess = () => {
  userStore.closeLoginDialog()
  router.push('/grapeSugar')
}
// 退出登录
const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
// 【修改】了解更多：跳转到PPT项目详情页面
const goToAbout = () => {
  router.push('/about/grape-big-create')
}

</script>
<style scoped>
.header-box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 8px 16px;
  /* 顶部圆角清零，仅保留底部圆角 */
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.nav-left{
  display: flex;
  align-items: center;
  gap: 32px;
}
.brand-logo{
  color:#d87093;
  font-size: 20px;
  font-weight: 700;
}
.nav-menu{
  display: flex;
  gap: 28px;
}
.menu-item{
  font-size: 16px;
  color:#333;
  cursor: pointer;
  transition: color 0.2s;
}
.menu-item:hover{
  color:#d87093;
}
.jump-bottom{}
.nav-right{
  display: flex;
  align-items: center;
}
.login-icon-btn{
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: background-color 0.2s;
}
.login-icon-btn:hover{
  background-color: #f8e8ef;
}
.user-info span{
  color:#a05773;
  font-size:16px;
}
.logout{
  margin-left:16px;
  cursor:pointer;
  color:#666;
  transition: color 0.2s;
}
.logout:hover{
  color:#d87093;
}
/* 咨询弹窗样式 */
.consult-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.consult-card{
  background: #fff;
  padding: 28px 32px;
  border-radius: 12px;
  min-width: 320px;
}
.consult-card h3{
  color:#d87093;
  margin-top: 0;
  margin-bottom: 18px;
}
.consult-card p{
  font-size: 15px;
  color:#333;
  margin: 10px 0;
}
.close-btn{
  margin-top: 20px;
  width: 100%;
  padding: 8px 0;
  border: none;
  background: #d87093;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}
.close-btn:hover{
  background: #c26082;
}
</style>