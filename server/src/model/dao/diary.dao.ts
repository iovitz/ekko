import { Op, col } from 'sequelize'
import { DiaryModel } from '../mysql/model_define/diary'
import { BaseDao } from './base.dao'
import { UserModel } from '../mysql/model_define/users'
import { sequelize } from '../mysql/mysql_connection'

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
    return DiaryModel.create(
      {
        uid,
        content,
        files,
        permission
      },
      {
        raw: true,
        attributes: ['id', 'content', 'files', 'createdAt', 'status']
      }
    )
  }

  static findDiaryById(id: number) {
    return DiaryModel.findOne({
      raw: true,
      where: {
        id
      },
      attributes: ['id', 'content', 'files', 'createdAt', 'status'],
      order: [['createdAt', 'desc']]
      // offset: (page - 1) * 15,
      // limit: 15
    })
  }

  /**
   * 创建新用户
   * @param phone 手机号
   */
  static getPageDiaryByUser(uid: number, page: number) {
    return DiaryModel.findAll({
      raw: true,
      where: {
        uid
      },
      attributes: ['id', 'content', 'files', 'createdAt', 'status'],
      order: [['createdAt', 'desc']]
      // offset: (page - 1) * 15,
      // limit: 15
    })
  }

  static findrecommendDiary(uid: number) {
    return sequelize.query(
      `SELECT * FROM diary, history_record, users where diary.permission = 1 AND diary.uid != ${uid} AND diary.id != history_record.did AND diary.uid != history_record.uid AND users.id = diary.uid;`
    )
  }
}
