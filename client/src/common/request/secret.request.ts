import { getUUID } from '../utils/encrypt'
import { commonRequest } from './request'

export function getAliCloudKey() {
  return commonRequest
    .post<{
      SecurityToken: string
    }>('/common/ali_sts_key', {})
    .then((res) => {
      return res.data
    })
}
