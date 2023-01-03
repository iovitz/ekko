import { UserModel } from '../mysql/model_define/users'
import { BaseDao } from './base.dao'

export class UserDao extends BaseDao {
  /**
   * 创建新用户
   * @param phone 手机号
   */
  static findUserByPhone(phone: string) {
    return UserModel.findOne({
      raw: true,
      where: {
        phone
      }
    })
  }
  /**
   * 创建新用户
   * @param phone 手机号
   */
  static createUser(phone: string, nickname: string) {
    return UserModel.create({
      phone,
      nickname
    })
  }
}
