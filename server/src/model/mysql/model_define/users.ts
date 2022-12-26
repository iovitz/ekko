import { Column, Table, Model, AllowNull, NotNull, Max } from 'sequelize-typescript'
import { sequelize } from '../mysql_connection'

interface User {
  username: string
  password: string
  nickname: string
  avatar?: string
  phone?: string
  email?: string
  status?: number
}

@Table({
  tableName: 'users'
})
export class UserModel extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number

  @Column
  declare username: string

  @Column
  declare password: string

  @Column
  declare nickname: string

  @Column
  declare avatar: string

  @Column
  declare phone: string

  @Column
  declare email: string

  @Column
  declare status: number
}

sequelize.addModels([UserModel])
