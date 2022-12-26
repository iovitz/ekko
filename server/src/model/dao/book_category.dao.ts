import { BookCategory1Model, BookCategory2Model, BookCategory3Model } from '../mysql/model_define/book_category'
import { BaseDao } from './base.dao'

export class BookCategoryDao extends BaseDao {
  static async findByLv1(id: number) {
    const res = await BookCategory1Model.findAll({
      raw: true,
      where: {
        id
      },
      include: [
        {
          model: BookCategory2Model,
          as: 'book_category_2'
        }
      ]
    })
    return res
  }
}
