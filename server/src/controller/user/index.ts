import { userDao } from '@/model/dao/user.dao'
import { Context } from 'vm'
import { Controller, KoaContext, Post } from '@/utils/koa_request'
import { UserControllerCtx } from './types'
import { ClientError } from '@/utils/errors/errors'
import { createToken, getPasswordWithSalt } from '@/utils/crypto/crypto'

@Controller('/user')
export class UserController {
  @Post('/register')
  async register(ctx: Context) {
    const { nickname, username, password } = ctx.request.body
    const isExists = Boolean(await userDao.findByUsername(username))
    if (isExists) {
      throw new ClientError('Username already exists')
    }
    const res = await userDao.createItem(nickname, username, getPasswordWithSalt(password))
    ctx.body = { nickname, username, password }
  }

  @Post('/login')
  async login(ctx: Context) {
    const { username, password } = ctx.request.body
    const userQueryResult = await userDao.findByUsernameAndPassword(username, getPasswordWithSalt(password))
    if (userQueryResult) {
      const data: Record<string, string | number> = {
        nickname: userQueryResult.nickname,
        status: userQueryResult.status
      }
      data.token = createToken(data)
      ctx.body = data
    } else {
      throw new ClientError('Wrong account or password')
    }
  }
}
