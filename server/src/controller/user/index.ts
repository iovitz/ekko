import { BaseController, Controller, KoaContext, KoaPostContext, Post } from '@/utils/koa_request'
import { VerifyCodeDao } from '@/model/dao/verify_code.dao'
import { ClientError } from '@/utils/errors/errors'
import { userParamsSchema } from './schema'
import { withSalt } from '@/utils/crypto/crypto'
import { UserDao } from '@/model/dao/user.dao'
import { getRandomName } from '@/utils/name'

@Controller('/user/v1')
export class UserController extends BaseController {
  @Post('/test')
  async test(ctx: KoaContext) {
    console.log(await VerifyCodeDao.clearExpiredItem())
    ctx.body = '123'
  }

  @Post('/login', userParamsSchema.login)
  async login(
    ctx: KoaPostContext<{
      phone: string
      code: string
    }>
  ) {
    const { phone, code } = ctx.request.body
    const res = await VerifyCodeDao.findItemByPhoneAndCode(phone, withSalt(code))
    if (res) {
      const { createdAt } = res
      if (Date.now() - new Date(createdAt).getTime() > 30 * 60 * 1000) {
        throw new ClientError('验证码已过期')
      } else {
        const isUserExits = await UserDao.findUserByPhone(phone)
        if (!isUserExits) {
          await UserDao.createUser(phone, getRandomName())
          ctx.body = 'success'
        }
      }
    }
    throw new ClientError('验证码错误')
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
    await VerifyCodeDao.createCodeItem(phone, withSalt(code))
    // FIXME@iovitz 这里有性能问题
    await VerifyCodeDao.clearExpiredItem()
    ctx.body = code
  }
}
