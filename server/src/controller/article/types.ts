import { KoaContext } from '@/utils/koa_request/decorators'

export interface ArticleController {
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
