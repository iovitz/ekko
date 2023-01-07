import { commonRequest } from './request'

export function publishArticle(content: string, files: any[]) {
  return commonRequest
    .post<{
      SecurityToken: string
    }>('/article/v1/publish', {
      content,
      files
    })
    .then((res) => {
      return res.data
    })
}
