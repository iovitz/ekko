import { defineStore } from 'pinia'
import { getUUID } from '@/common/utils/encrypt'
import { getAliCloudKey } from '@/common/request/secret.request'

export const useArticleStore = defineStore({
  id: 'article', // id必填，且需要唯一
  state: () => {
    const { platform } = uni.getSystemInfoSync()
    return {
      uploadHandler: null
    }
  },
  actions: {
    publishArticle(content: string, imgList: any[]) {
      const files: string[] = []
      getAliCloudKey().then((res) => {
        const promisses = imgList.map((fileItem) => {
          return new Promise((success, fail) => {
            const path = `images/${getUUID(20, 0)}-${Date.now()}${fileItem.url?.substring(fileItem.url.lastIndexOf('.') || 0)}`
            files.push(`https://touch-app-dev.oss-cn-hangzhou.aliyuncs.com/${path}`)
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
        Promise.all(promisses).then((item) => {
          console.log('成功了啊哈', item)
        })
      })
    }
  }
})
