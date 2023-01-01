import { Context } from 'vm'
import { Controller, KoaContext, Post } from '@/utils/koa_request'
import { UserControllerCtx } from './types'
import { ClientError } from '@/utils/errors/errors'
import { createToken, getPasswordWithSalt } from '@/utils/crypto/crypto'

@Controller('/user/v1')
export class UserController {
  @Post('/login')
  async login(ctx: Context) {
    ctx.body = '123'
  }

  @Post('/sendCode')
  async sendCode(ctx: Context) {
    ctx.body = '123'
  }
}
