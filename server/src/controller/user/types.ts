import { KoaContext } from 'src/utils/koa_request'

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
