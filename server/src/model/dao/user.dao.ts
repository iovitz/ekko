import { UserModel } from '../mysql/model_define/users'
import { BaseDao } from './base.dao'

export class UserDao extends BaseDao {
  createItem(nickname: string, username: string, password: string) {
    return UserModel.create({
      nickname,
      username,
      password
    })
  }

  findByUsername(username: string) {
    return UserModel.findOne({
      raw: true,
      where: {
        username
      }
    })
  }

  findByUsernameAndPassword(username: string, password: string) {
    return UserModel.findOne({
      raw: true,
      where: {
        username,
        password
      }
    })
  }
}

export const userDao = new UserDao()
