import { commonRequest } from './request'

export function getAliCloudKey() {
  return commonRequest
    .post<{
      SecurityToken: string
    }>('/secret/ali_sts_key', {})
    .then((res) => {
      return res.data
    })
}
