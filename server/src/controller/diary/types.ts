import { KoaContext } from '@/utils/koa_request/decorators'

export interface DiaryController {
  publish: KoaContext<
    string,
    {},
    {
      nickname: string
      username: string
      password: string
    }
  >
}
