import { STS } from 'ali-oss'
import { BaseController, Controller, KoaContext, KoaPostContext, Post } from '@/utils/koa_request'
import appConfig from '@/config/app_config'

const config = appConfig.getConfig()

@Controller('/common')
export class CommonController extends BaseController {
  @Post('/ali_sts_key')
  async test(ctx: KoaContext) {
    const sts = new STS({
      // 填写步骤1创建的RAM用户AccessKey。
      accessKeyId: config.ali_cloud_access_key,
      accessKeySecret: config.ali_cloud_access_key_secret
    })
    const result = await sts.assumeRole(config.ali_cloud_arn)
    ctx.body = {
      AccessKeyId: result.credentials.AccessKeyId,
      AccessKeySecret: result.credentials.AccessKeySecret,
      SecurityToken: result.credentials.SecurityToken,
      Expiration: result.credentials.Expiration
    }
  }
}
