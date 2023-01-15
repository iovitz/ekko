import { Column, Table, Model, AllowNull, NotNull, Max, DataType, PrimaryKey } from 'sequelize-typescript'
import { sequelize } from '../mysql_connection'

interface HistoryRecord {
  uid?: number
  did?: number
  createdAt?: string
}

@Table({
  tableName: 'history_record'
})
export class HistoryRecordModel extends Model<HistoryRecord> {
  @PrimaryKey
  @Column({
    type: DataType.NUMBER
  })
  declare uid: string

  @PrimaryKey
  @Column({
    type: DataType.NUMBER
  })
  declare did: string

  @Column({
    type: DataType.TIME
  })
  declare createdAt: string

  @Column({
    type: DataType.NUMBER
  })
  declare status: number
}

sequelize.addModels([HistoryRecordModel])
