import { DiaryModel } from './model_define/diary'
import { UserModel } from './model_define/users'

UserModel.hasMany(DiaryModel, {
  sourceKey: 'id',
  foreignKey: 'uid'
})
DiaryModel.belongsTo(UserModel, {
  foreignKey: 'uid'
})
