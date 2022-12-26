import { Column, Table, Model, AllowNull, NotNull, Max } from 'sequelize-typescript'
import { sequelize } from '../mysql_connection'

interface Field {
  name: string
  sort_id: number
}

@Table({
  tableName: 'fields'
})
export class FieldModel extends Model<Field> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number

  @Column
  declare name: string

  @Column
  declare sort_id: number
}

sequelize.addModels([FieldModel])
