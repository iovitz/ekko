import 'dotenv'

export type CustomConfig = Readonly<{
  app_port: string
  global_router_prefix: string

  mysql_host: string
  mysql_user: string
  mysql_password: string
  mysql_dbname: string

  password_salt: string
  token_key: string

  aliyun_accessKeyId: string
  aliyun_accessKeySecret: string
  aliyun_arn: string
}>

declare module 'dotenv' {
  export interface DotenvParseOutput extends CustomConfig {}
}
