import { Column, Entity, PrimaryGeneratedColumn, Table } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    comment: '用户昵称',
  })
  name: string

  @Column({
    comment: '描述信息',
  })
  desc: string

  @Column({
    comment: '手机号',
  })
  tel: string

  @Column({
    comment: 'MD5密码',
    select: false,
  })
  password: string

  @Column({
    comment: '账户信息',
  })
  account: string
}
