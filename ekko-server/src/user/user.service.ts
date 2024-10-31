import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entity/user.entity'
import { Repository } from 'typeorm'
import { UserInput } from './dto/user-input.type'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(userData: UserInput) {
    const user = new User()
    user.id = userData.id
    user.desc = userData.desc
    this.usersRepository.save(user)
    return true
  }

  find(id: string) {
    return this.usersRepository.findOneBy({
      id,
    })
  }

  update(id: string, userInfo: UserInput) {
    this.usersRepository.update(id, userInfo)
    return !!id
  }

  del(id: string) {
    this.usersRepository.delete({
      id,
    })
    return !!id
  }
}
