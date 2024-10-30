import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TracerService } from 'src/services/tracer/tracer.service'
import { Tracer } from 'src/shared/decorator/tracer'
import { getUsersDTO } from './user.dto'
import { UserService } from './user.service'

@ApiTags('User Module')
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/list')
  @ApiOperation({
    description: '用户注册',
  })
  @ApiResponse({
    status: 200,
    description: '注册成功的用户信息',
  })
  async getUsers(@Query() query: getUsersDTO, @Tracer() tracer: TracerService) {
    tracer.error('信息中携带Error', new Error('123123'))
    tracer.warn('打印警告')
    tracer.log('普通信息')
    return ''
  }
}
