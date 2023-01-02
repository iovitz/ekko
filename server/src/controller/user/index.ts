import { Context } from 'vm'
import { Controller, KoaContext, Post } from '@/utils/koa_request'
import { VerifyCodeDao } from '@/model/dao/verify_code.dao'
import { ClientError } from '@/utils/errors/errors'

@Controller('/user/v1')
export class UserController {
  @Post('/login')
  async login(ctx: Context) {
    ctx.body = '123'
  }

  @Post('/send_verify_code')
  async sendCode(ctx: Context) {
    const { phone } = ctx.request.body
    const isSended = await VerifyCodeDao.findCodeItem(phone)
    if (isSended) {
      throw new ClientError('请60S后重试')
    }
    const code = Math.random()
      .toString(36)
      .substring(2, 2 + 4)
    await VerifyCodeDao.createCodeItem(phone, code)
    ctx.body = 'success'
  }
}
