import { commonRequest } from './request'

export function userLogin(phone: string, code: string) {
  return commonRequest
    .post<{
      token: string
    }>('/user/v1/login', {
      phone,
      code
    })
    .then((res) => {
      return res.data
    })
}
