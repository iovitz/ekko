import { defineStore } from 'pinia'
import { getUUID } from '@/common/utils/encrypt'
import { getAliCloudKey } from '@/common/request/secret.request'
import { getMyDiaryList, publishDiary } from '@/common/request/diary.request'
import { printer } from '@/common/utils'

export const useDiaryStore = defineStore({
  id: 'diary', // id必填，且需要唯一
  state: () => {
    const { platform } = uni.getSystemInfoSync()
    return {
      myDiaryList: [] as Array<{
        id: number
        content: string
        files: {
          type: string
          url: string
        } | null
        createdAt: string
      }>,
      uploadingContent: null as null | {
        timestamp: number
        content: string
        permission: number
      }
    }
  },
  actions: {
    getMyDiary() {
      const res = getMyDiaryList(1).then((res) => {
        res.forEach((itm) => {
          this.myDiaryList.push(itm)
        })
      })
    },
    publishDiary(content: string, imgList: any[], isPublic: boolean) {
      const files: any[] = []
      const permission = isPublic ? 1 : 0
      this.uploadingContent = {
        permission,
        content,
        timestamp: Date.now()
      }
      console.log(this.uploadingContent)
      getAliCloudKey()
        .then((res) => {
          const promisses = imgList.map((fileItem) => {
            return new Promise((success, fail) => {
              const path = `images/${getUUID(20, 0)}-${Date.now()}${fileItem.url?.substring(fileItem.url.lastIndexOf('.') || 0)}`
              files.push({
                url: `https://touch-app-dev.oss-cn-hangzhou.aliyuncs.com/${path}`,
                type: fileItem.fileType
              })
              uni.uploadFile({
                url: 'https://touch-app-dev.oss-cn-hangzhou.aliyuncs.com/',
                filePath: fileItem.url,
                name: 'file', // 必须填file。
                fileType: 'image',
                success,
                formData: {
                  name: fileItem.url,
                  key: path,
                  'x-oss-security-token': res.SecurityToken
                },
                fail
              })
            })
          })
          return Promise.all(promisses).then(() => {
            return publishDiary(content, files, permission).then((res) => {
              this.myDiaryList.unshift(res)
            })
          })
        })
        .then(() => {
          this.uploadingContent = null
        })
        .catch((e) => {
          if (e instanceof Error) {
            this.uploadingContent = null
          }
        })
    }
  }
})
