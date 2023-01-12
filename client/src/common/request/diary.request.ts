import { commonRequest } from './request'

export function publishDiary(content: string, files: any[], permission: number) {
  console.log(permission)
  return commonRequest
    .post<{
      SecurityToken: string
    }>('/diary/v1/publish', {
      content,
      files,
      permission
    })
    .then((res) => {
      return res.data
    })
}

export function getMyDiaryList(page: number) {
  return commonRequest
    .post<
      Array<{
        id: number
        content: string
        files: {
          type: string
          url: string
        } | null
        createdAt: string
      }>
    >('/diary/v1/my_diary_list', { page })
    .then((res) => {
      return res.data
    })
}
