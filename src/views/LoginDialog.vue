<template>
  <el-dialog
    v-model="dialogVisible"
    width="460px"
    :show-close="false"
    align-center
  >
    <div class="login-card">
      <h2 class="login-title">葡跃 - 葡萄甜度农户监测系统</h2>
      <el-tabs v-model="activeTab">
        <!-- 登录 -->
        <el-tab-pane label="账号登录" name="login">
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="80px">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="loginForm.phone" placeholder="请输入绑定手机号" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="loginForm.pwd" show-password placeholder="请输入登录密码" />
            </el-form-item>
            <el-form-item>
              <el-switch v-model="remember" label="记住农户账号" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                color="#d87093"
                style="width:100%"
                @click="submitLogin"
              >进入葡跃系统</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 注册 -->
        <el-tab-pane label="农户入驻注册" name="register">
          <el-form ref="regFormRef" :model="regForm" :rules="regRules" label-width="80px">
            <el-form-item label="农户昵称" prop="roleName">
              <el-input v-model="regForm.roleName" placeholder="填写农户姓名/果园名称"/>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="regForm.phone" placeholder="手机号作为唯一登录账号" clearable/>
            </el-form-item>
            <el-form-item label="登录密码" prop="pwd">
              <el-input v-model="regForm.pwd" show-password placeholder="设置6位以上登录密码"/>
            </el-form-item>
            <el-form-item label="葡萄品种" prop="grapeType">
              <el-select v-model="regForm.grapeType" placeholder="请选择种植品种" style="width:100%">
                <el-option label="阳光玫瑰" value="ygmg" />
                <el-option label="巨峰" value="jf" />
                <el-option label="夏黑" value="xh" />
                <el-option label="蓝宝石" value="lbs" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                color="#d87093"
                style="width:100%"
                @click="submitRegister"
              >完成葡跃入驻</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const props = defineProps({
  visible: Boolean
})
const emit = defineEmits(['update:visible', 'login-success'])

const dialogVisible = ref(false)
watch(() => props.visible, val => dialogVisible.value = val)
watch(dialogVisible, val => emit('update:visible', val))

const activeTab = ref('login')
const remember = ref(false)

// =========登录表单校验规则增强=========
const loginFormRef = ref(null)
const loginForm = ref({
  phone: '',
  pwd: ''
})
const loginRules = ref({
  phone: [
    { required: true, message: '请填写手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号', trigger: 'blur' }
  ],
  pwd: [{ required: true, message: '请填写密码', trigger: 'blur' }]
})

// =========注册表单校验规则增强=========
const regFormRef = ref(null)
const regForm = ref({
  roleName: '',
  phone: '',
  pwd: '',
  grapeType: ''
})
const regRules = ref({
  roleName: [{ required: true, message: '请填写农户/果园名称', trigger: 'blur' }],
  phone: [
    { required: true, message: '请填写手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '设置登录密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  grapeType: [{ required: true, message: '请选择种植葡萄品种', trigger: 'change' }]
})

// 打开弹窗自动回填已记住手机号
onMounted(() => {
  const savedPhone = localStorage.getItem('puyue_farmPhone')
  if (savedPhone) {
    loginForm.value.phone = savedPhone
    remember.value = true
  }
})

// 登录逻辑
const submitLogin = async () => {
  await loginFormRef.value.validate()
  const userStr = localStorage.getItem('puyue_user_' + loginForm.value.phone)
  if (!userStr) {
    return ElMessage.error('账号未入驻葡跃，请先注册')
  }
  const userInfo = JSON.parse(userStr)
  if (userInfo.pwd !== loginForm.value.pwd) {
    return ElMessage.error('登录密码错误')
  }

  userStore.login(loginForm.value.phone, userInfo.roleName, userInfo.grapeType)

  // 账号持久化存储（品牌隔离key，避免和旧系统缓存冲突）
  if (remember.value) {
    localStorage.setItem('puyue_farmPhone', loginForm.value.phone)
  } else {
    localStorage.removeItem('puyue_farmPhone')
  }
  ElMessage.success('葡跃系统登录成功！')
  emit('login-success')
}

// 注册入驻逻辑
const submitRegister = async () => {
  await regFormRef.value.validate()
  const key = 'puyue_user_' + regForm.value.phone
  if (localStorage.getItem(key)) {
    return ElMessage.warning('该手机号已入驻葡跃，直接登录即可')
  }
  // 品牌专属缓存键，数据隔离
  localStorage.setItem(key, JSON.stringify({
    roleName: regForm.value.roleName,
    phone: regForm.value.phone,
    pwd: regForm.value.pwd,
    grapeType: regForm.value.grapeType
  }))
  ElMessage.success('入驻葡跃成功，切换至登录页')
  activeTab.value = 'login'
  loginForm.value.phone = regForm.value.phone
}
</script>

<style scoped>
.login-card {
  padding: 10px 4px;
}
.login-title {
  text-align: center;
  color: #a06484;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
}
:deep(.el-dialog__body) {
  padding: 10px 20px 24px !important;
}
/* 微调tab选中色调适配品牌粉 */
:deep(.el-tabs__item.is-active) {
  color: #d87093;
}
:deep(.el-tabs__active-bar) {
  background-color: #d87093;
}
</style>