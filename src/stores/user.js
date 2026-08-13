import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    userId: localStorage.getItem('userId') || '',
    username: localStorage.getItem('username') || '',
    loginDialogVisible: false
  }),
  actions: {
    login(uid, name) {
      this.userId = uid
      this.username = name
      // 本地持久化保存
      localStorage.setItem('userId', uid)
      localStorage.setItem('username', name)
    },
    logout() {
      this.userId = ''
      this.username = ''
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
    }
  }
})