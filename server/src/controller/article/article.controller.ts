import { STS } from 'ali-oss'
import { BaseController, Controller, KoaContext, KoaPostContext, Post } from '@/utils/koa_request'
import appConfig from '@/config/app_config'
import { articleParamsSchema } from './schema'
import { ArticleDao } from '@/model/dao/article.dao'

const config = appConfig.getConfig()

@Controller('/article/v1')
export class ArticleController extends BaseController {
  @Post('/publish', articleParamsSchema.publish)
  async publish(
    ctx: KoaPostContext<{
      content: string
      files: {
        url: string
        type: string
      }[]
    }>
  ) {
    const { content, files } = ctx.request.body
    await ArticleDao.createArticle(content, JSON.stringify(files))
    ctx.body = 'success'
  }
}
