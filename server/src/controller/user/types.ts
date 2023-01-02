import { KoaContext } from '@/utils/koa_request/decorators'

export interface UserControllerCtx {
  register: KoaContext<
    string,
    {},
    {
      nickname: string
      username: string
      password: string
    }
  >
}
