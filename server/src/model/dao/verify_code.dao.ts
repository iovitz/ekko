import { VerifyCodeModel } from '../mysql/model_define/verify_code'
import { BaseDao } from './base.dao'

export class VerifyCodeDao extends BaseDao {
  static findCodeItem(phone: string) {
    return VerifyCodeModel.findOne({
      raw: true,
      where: {
        phone
      }
    })
  }
  static createCodeItem(phone: string, code: string) {
    return VerifyCodeModel.create({
      phone,
      code
    })
  }
}
