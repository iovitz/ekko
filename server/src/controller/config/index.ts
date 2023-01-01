import { Context } from 'vm'
import { STS } from 'ali-oss'
import { Controller, Get } from '@/utils/koa_request'
import appConfig from '@/config/app_config'

const config = appConfig.getConfig()
@Controller('/config')
export class ConfigController {
  @Get('/ali_oss_secirity_token')
  async register(ctx: Context) {
    const sts = new STS({
      // 填写步骤1创建的RAM用户AccessKey。
      accessKeyId: config.aliyun_accessKeyId,
      accessKeySecret: config.aliyun_accessKeySecret
    })
    const result = await sts.assumeRole(config.aliyun_arn)
    ctx.body = {
      AccessKeyId: result.credentials.AccessKeyId,
      AccessKeySecret: result.credentials.AccessKeySecret,
      SecurityToken: result.credentials.SecurityToken,
      Expiration: result.credentials.Expiration
    }
  }
}
