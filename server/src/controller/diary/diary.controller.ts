import { STS } from 'ali-oss'
import { HistoryRecordDao } from '../../model/dao/history_record.dao'
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
    const res = await DiaryDao.createDiary(ctx.user.id, content, JSON.stringify(files), permission)
    const { id } = res.dataValues
    const record = await DiaryDao.findDiaryById(id!)
    if (!record) throw new Error('db Error')
    const { createdAt, status } = record
    const fileArr = JSON.parse(record?.files || '[]')
    ctx.body = {
      id,
      content: res.dataValues.content,
      files: fileArr[0] ?? null,
      createdAt,
      status
    }
  }

  @Post('/my_diary_list')
  async getMyDiaryList(ctx: KoaPostContext<{ page: number }>) {
    const { page } = ctx.request.body
    const res = await DiaryDao.getPageDiaryByUser(ctx.user.id, page)
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

  @Post('/diary_detail')
  async getDiaryDetail(ctx: KoaPostContext<{ id: number }>) {
    const { id } = ctx.request.body
    const res = await DiaryDao.findDiaryById(id)
    ctx.body = res
  }

  @Post('/get_recommend_diary')
  async getRecommonDiary(ctx: KoaPostContext) {
    const { id } = ctx.user
    const res = await DiaryDao.findrecommendDiary(id)
    ctx.body = res
  }

  @Post('/look_diary')
  async lookDiary(ctx: KoaPostContext<{ did: number }>) {
    const { id } = ctx.user
    const { did } = ctx.request.body
    if (!(await HistoryRecordDao.findRecord(id, did))) {
      HistoryRecordDao.addRecord(id, did)
    }
    ctx.body = 'success'
  }
}
