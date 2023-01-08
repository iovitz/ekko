import { Column, Table, Model, AllowNull, NotNull, Max, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript'
import { sequelize } from '../mysql_connection'

interface Article {
  id?: string
  content?: string
  files?: string
  like?: string
  comment?: string
  createdAt?: string
}

@Table({
  tableName: 'article'
})
export class ArticleModel extends Model<Article> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.NUMBER
  })
  declare id: string

  @Column({
    type: DataType.CHAR
  })
  declare content: string

  @Column({
    type: DataType.CHAR
  })
  declare files: string

  @Column({
    type: DataType.NUMBER
  })
  declare like: number

  @Column({
    type: DataType.NUMBER
  })
  declare comment: number

  @Column({
    type: DataType.TIME
  })
  declare createdAt: string
}

sequelize.addModels([ArticleModel])
