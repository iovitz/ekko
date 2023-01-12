import { DiaryModel } from '../mysql/model_define/diary'
import { BaseDao } from './base.dao'

export class DiaryDao extends BaseDao {
  /**
   * 创建新用户
   * @param phone 手机号
   */
  static getRecommendDiary(content: string, files: string) {
    return DiaryModel.create({
      content,
      files
    })
  }
  /**
   * 创建新用户
   * @param phone 手机号
   */
  static createDiary(uid: number, content: string, files: string, permission: number) {
    return DiaryModel.create({
      uid,
      content,
      files,
      permission
    })
  }

  /**
   * 创建新用户
   * @param phone 手机号
   */
  static getPageDiaryByUser(uid: number, page: number) {
    return DiaryModel.findAll({
      where: {
        uid
      },
      attributes: ['id', 'content', 'files', 'createdAt', 'status']
      // offset: (page - 1) * 15,
      // limit: 15
    })
  }
}
