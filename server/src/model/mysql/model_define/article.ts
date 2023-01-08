import { Column, Table, Model, AllowNull, NotNull, Max, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript'
import { sequelize } from '../mysql_connection'

interface Article {
  id?: number
  uid?: number
  content?: string
  files?: string
  like?: string
  commentCount?: string
  createdAt?: string
  status?: number
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
  declare id: number

  @Column({
    type: DataType.NUMBER
  })
  declare uid: number

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
  declare commentCount: number

  @Column({
    type: DataType.TIME
  })
  declare createdAt: string

  @Column({
    type: DataType.TINYINT
  })
  declare status: number
}

sequelize.addModels([ArticleModel])
