import { Op } from 'sequelize'
import { VerifyCodeModel } from '../mysql/model_define/verify_code'
import { BaseDao } from './base.dao'

export class VerifyCodeDao extends BaseDao {
  /**
   * 查找验证码条目
   */
  static findCodeItem(phone: string) {
    return VerifyCodeModel.findOne({
      raw: true,
      where: {
        phone
      }
    })
  }
  /**
   * 根据手机号和验证码查询验证条目
   */
  static findItemByPhoneAndCode(phone: string, code: string) {
    return VerifyCodeModel.findOne({
      raw: true,
      where: {
        phone,
        code
      }
    })
  }
  /**
   * 创建验证码条目
   */
  static createCodeItem(phone: string, code: string) {
    return VerifyCodeModel.create({
      phone,
      code
    })
  }
  /**
   * 查询所有验证码
   */
  static findAllCodeItem() {
    return VerifyCodeModel.findAll({
      raw: true
    })
  }
  /**
   * 清除30分钟前的验证码
   */
  static clearExpiredItem() {
    return VerifyCodeModel.destroy({
      where: {
        createdAt: { [Op.lte]: new Date(Date.now() - 30 * 60 * 1000) }
      }
    })
  }
}
