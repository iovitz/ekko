import { BaseController, Controller, KoaContext, Post } from '@/utils/koa_request'
import { VerifyCodeDao } from '@/model/dao/verify_code.dao'
import { ClientError } from '@/utils/errors/errors'
import { userParamsSchema } from './schema'

@Controller('/user/v1')
export class UserController extends BaseController {
  @Post('/login')
  async login(ctx: KoaContext) {
    ctx.body = '123'
  }

  @Post('/send_verify_code', userParamsSchema.sendCode)
  async sendCode(ctx: KoaContext) {
    const { phone } = ctx.request.body
    const isSended = await VerifyCodeDao.findCodeItem(phone)
    if (isSended) {
      throw new ClientError('请60S后重试')
    }
    const code = Math.random()
      .toString(36)
      .substring(3, 3 + 4)
    await VerifyCodeDao.createCodeItem(phone, code)
    ctx.body = 'success'
  }
}
