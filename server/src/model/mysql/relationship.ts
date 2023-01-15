import { DiaryModel } from './model_define/diary'
import { HistoryRecordModel } from './model_define/history'
import { UserModel } from './model_define/users'

UserModel.hasMany(DiaryModel, {
  as: 'diary',
  sourceKey: 'id',
  foreignKey: 'uid'
})
DiaryModel.belongsTo(UserModel, {
  as: 'user',
  foreignKey: 'uid'
})

// 历史记录
UserModel.hasMany(HistoryRecordModel, {
  as: 'history',
  sourceKey: 'id',
  foreignKey: 'uid'
})
DiaryModel.hasMany(HistoryRecordModel, {
  as: 'history',
  sourceKey: 'id',
  foreignKey: 'did'
})
HistoryRecordModel.belongsTo(UserModel, {
  as: 'user',
  foreignKey: 'uid'
})
HistoryRecordModel.belongsTo(DiaryModel, {
  as: 'diary',
  foreignKey: 'uid'
})
