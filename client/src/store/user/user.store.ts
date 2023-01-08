import jwtDecode from 'jwt-decode'
import { defineStore } from 'pinia'
import { userLogin } from '@/common/request/user.request'
import { storage } from '@/common/utils/store/storage'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {}
  },
  // actions 用来修改 state
  actions: {
    async login(phone: string, code: string) {
      return userLogin(phone, code).then((res) => {
        storage.set('token', res.token)
      })
    }
  }
})
