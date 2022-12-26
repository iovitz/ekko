import { FieldModel } from '../mysql/model_define/fields'
import { BaseDao } from './base.dao'

export class FieldDao extends BaseDao {
  findByUsername() {
    return FieldModel.findAll({
      raw: true,
      attributes: ['name', 'sort_id']
    })
  }
}

export const fieldDao = new FieldDao()
