import { STS } from 'ali-oss'
import { BaseController, Controller, KoaContext, KoaPostContext, Post } from '@/utils/koa_request'
import appConfig from '@/config/app_config'

const config = appConfig.getConfig()

@Controller('/article/v1')
export class ArticletController extends BaseController {
  @Post('/publish')
  async test(
    ctx: KoaPostContext<{
      content: string
      files: string[]
    }>
  ) {
    const { content, files } = ctx.request.body
    console.log(content, files)
    ctx.body = 'success'
  }
}
