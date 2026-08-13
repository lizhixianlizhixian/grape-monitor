import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',      // 手机号(唯一账号)
    roleName: '',       // 农户名称
    grapeType: '',      // 葡萄品种 ygmg=阳光玫瑰 / jf=巨峰
    region: '',         // 产区代码（如 turpan）
    isLogin: false,
    // 新增：控制导航栏登录弹窗
    loginDialogVisible: false
  }),
  actions: {
    // 登录
    login(account, roleName, grapeType, region = '') {
      this.username = account
      this.roleName = roleName
      this.grapeType = grapeType
      this.region = region
      this.isLogin = true
      // 持久化存储
      localStorage.setItem('userInfo', JSON.stringify({
        username: this.username,
        roleName: this.roleName,
        grapeType: this.grapeType,
        region: this.region,
        isLogin: this.isLogin
      }))
    },
    // 退出登录
    logout() {
      this.username = ''
      this.roleName = ''
      this.grapeType = ''
      this.region = ''
      this.isLogin = false
      localStorage.removeItem('userInfo')
    },
    // 页面刷新时恢复登录状态（关键！刷新不会直接掉线）
    restoreLogin() {
      const cache = localStorage.getItem('userInfo')
      if (cache) {
        const data = JSON.parse(cache)
        this.username = data.username
        this.roleName = data.roleName
        this.grapeType = data.grapeType
        this.region = data.region || ''
        this.isLogin = data.isLogin
      }
    },
    // 更新产区（用户在城市搜索中选择后调用）
    updateRegion(regionCode) {
      this.region = regionCode
      const cache = localStorage.getItem('userInfo')
      if (cache) {
        const data = JSON.parse(cache)
        data.region = regionCode
        localStorage.setItem('userInfo', JSON.stringify(data))
      }
    },
    // ----新增弹窗控制action----
    openLoginDialog() {
      this.loginDialogVisible = true
    },
    closeLoginDialog() {
      this.loginDialogVisible = false
    }
  }
})