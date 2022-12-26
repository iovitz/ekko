import { Context } from 'vm'
import { Controller, Get } from '@/utils/koa_request'
import { fieldDao } from '@/model/dao/field.dao'

@Controller('/article')
export class ArticleController {
  @Get('/get_all_fields')
  async register(ctx: Context) {
    const allFields = await fieldDao.findByUsername()
    ctx.body = allFields
  }
}
