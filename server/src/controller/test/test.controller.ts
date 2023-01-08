import { STS } from 'ali-oss'
import { BaseController, Controller, KoaContext, KoaPostContext, Post } from '@/utils/koa_request'
import appConfig from '@/config/app_config'

const config = appConfig.getConfig()

@Controller('/test')
export class TestController extends BaseController {
  @Post('/')
  async test(ctx: KoaContext) {
    ctx.body = 'success'
  }
}
