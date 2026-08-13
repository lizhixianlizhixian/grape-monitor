import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入Element Plus
import ElementPlus from 'element-plus'
import '@/assets/global.css'
import 'element-plus/dist/index.css'
// 创建pinia实例
const pinia = createPinia()
// 创建vue实例
const app = createApp(App)

// 挂载插件顺序
app.use(pinia)
// 新增：刷新恢复登录状态（必须在use(pinia)之后执行）
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
userStore.restoreLogin()

app.use(router)
app.use(ElementPlus)

app.mount('#app')