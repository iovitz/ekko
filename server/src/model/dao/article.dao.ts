import { ArticleModel } from '../mysql/model_define/article'
import { BaseDao } from './base.dao'

export class ArticleDao extends BaseDao {
  /**
   * 创建新用户
   * @param phone 手机号
   */
  static getRecommendArticle(content: string, files: string) {
    return ArticleModel.create({
      content,
      files
    })
  }
  /**
   * 创建新用户
   * @param phone 手机号
   */
  static createArticle(uid: number, content: string, files: string) {
    return ArticleModel.create({
      uid,
      content,
      files
    })
  }
}
