import { Column, Table, Model, AllowNull, NotNull, Max, DataType, PrimaryKey } from 'sequelize-typescript'
import { sequelize } from '../mysql_connection'

interface VerifyCode {
  phone?: string
  code?: string
}

@Table({
  tableName: 'varify_code'
})
export class VerifyCodeModel extends Model<VerifyCode> {
  @PrimaryKey
  @Column({
    type: DataType.CHAR
  })
  declare phone: string

  @Column({
    type: DataType.CHAR
  })
  declare code: string
}

sequelize.addModels([VerifyCodeModel])
