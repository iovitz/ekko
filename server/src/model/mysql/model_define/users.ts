import { Column, Table, Model, AllowNull, NotNull, Max, DataType } from 'sequelize-typescript'
import { sequelize } from '../mysql_connection'

interface User {
  id: number
  phone: string
  nickname: string
  sex?: number
  avatar?: string
  createdAt: string
  status: number
}

@Table({
  tableName: 'users'
})
export class UserModel extends Model<Partial<User>> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.NUMBER
  })
  declare id: number

  @Column({
    type: DataType.STRING
  })
  declare phone: string

  @Column({
    type: DataType.STRING
  })
  declare nickname: string

  @Column({
    type: DataType.NUMBER
  })
  declare sex: number

  @Column({
    type: DataType.STRING
  })
  declare avatar: string

  @Column({
    type: DataType.TIME
  })
  declare createdAt: string

  @Column({
    type: DataType.NUMBER
  })
  declare status: number
}

sequelize.addModels([UserModel])
