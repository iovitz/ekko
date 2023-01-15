import { HistoryRecordModel } from '../mysql/model_define/history'
import { BaseDao } from './base.dao'

export class HistoryRecordDao extends BaseDao {
  static addRecord(uid: number, did: number) {
    return HistoryRecordModel.create({
      uid,
      did
    })
  }

  static findRecord(uid: number, did: number) {
    return HistoryRecordModel.findOne({
      raw: true,
      where: {
        uid,
        did
      }
    })
  }
}
