import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserType } from './dto/user.type'
import { UserInput } from './dto/user-input.type'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  @Inject()
  userService: UserService

  @Mutation(() => Boolean)
  async create(@Args('params') params: UserInput) {
    return this.userService.create(params)
  }

  @Query(() => UserType, {
    description: '使用ID查询用户',
  })
  find(@Args('id') id: string) {
    return this.userService.find(id)
  }
}
