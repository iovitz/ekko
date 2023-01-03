import { createHash } from 'crypto'
import { sign } from 'jsonwebtoken'
import appConfig from '@/config/app_config'

const PasswordSalt = appConfig.getConfig('password_salt')
const TokenKey = appConfig.getConfig('token_key')

export function withSalt(password: string) {
  const saltPassword = createHash('md5')
    .update(PasswordSalt + password)
    .digest('hex')
  return saltPassword
}

export function createToken<T extends {}>(data: T) {
  const token = sign(data, TokenKey)
  return token
}
