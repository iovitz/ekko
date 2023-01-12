import { STS } from 'ali-oss'
import { BaseController, Controller, KoaContext, KoaPostContext, Post } from '@/utils/koa_request'
import appConfig from '@/config/app_config'
import { diaryParamsSchema } from './schema'
import { DiaryDao } from '@/model/dao/diary.dao'

const config = appConfig.getConfig()

@Controller('/diary/v1')
export class DiaryController extends BaseController {
  @Post('/publish', diaryParamsSchema.publish)
  async publish(
    ctx: KoaPostContext<{
      content: string
      files: {
        url: string
        type: string
      }[]
      permission: number
    }>
  ) {
    const { content, files, permission } = ctx.request.body
    const { id } = ctx.user
    await DiaryDao.createDiary(id, content, JSON.stringify(files), permission)
    ctx.body = 'success'
  }

  @Post('/my_diary_list')
  async getMyDiaryList(ctx: KoaPostContext<{ page: number }>) {
    const { id } = ctx.user
    const { page } = ctx.request.body
    const res = await DiaryDao.getPageDiaryByUser(id, page)
    res.forEach((itm) => {
      const {
        // eslint-disable-next-line no-empty-pattern
        files = '[]'
      } = itm
      const filesArr = JSON.parse(files) || []
      if (filesArr.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        itm.files = filesArr[0]
      } else {
        itm.files = null as any
      }
    })
    ctx.body = res
  }
}
