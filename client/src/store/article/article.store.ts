import { defineStore } from 'pinia'
import { getUUID } from '@/common/utils/encrypt'
import { getAliCloudKey } from '@/common/request/secret.request'
import { publishArticle } from '@/common/request/article.request'
import { printer } from '@/common/utils'

export const useArticleStore = defineStore({
  id: 'article', // id必填，且需要唯一
  state: () => {
    const { platform } = uni.getSystemInfoSync()
    return {
      uploadHandler: null as null | Promise<void>
    }
  },
  actions: {
    publishArticle(content: string, imgList: any[]) {
      const files: any[] = []
      this.uploadHandler = getAliCloudKey()
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
            console.log(JSON.stringify(files).length)
            return publishArticle(content, files)
          })
        })
        .then(() => {
          this.uploadHandler = null
        })
        .catch((e) => {
          if (e instanceof Error) {
            this.uploadHandler = null
            printer.error('上传失败', e.message)
          } else {
            printer.error('上传失败', e)
          }
        })
    }
  }
})
