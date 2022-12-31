import { defineStore } from 'pinia'

export const useSystemStore = defineStore({
  id: 'system', // id必填，且需要唯一
  state: () => {
    const { platform } = uni.getSystemInfoSync()
    return {
      isApp: ['android', 'ios'].includes(platform),
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 30
    }
  },
  // actions 用来修改 state
  actions: {
    setIsAll(v: boolean) {
      this.isApp = v
    }
  }
})
