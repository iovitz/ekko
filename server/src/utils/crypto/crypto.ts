import { createHash } from 'crypto'
import { sign, verify } from 'jsonwebtoken'
import appConfig from '@/config/app_config'
import { AuthenticationError } from '../errors/errors'

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

const urlWhiteList = ['/touch/user/v1/login']

// 解析jwt
export function verifyToken(url: string, token?: string) {
  if (urlWhiteList.includes(url)) {
    return {}
  }
  if (!token) {
    throw new AuthenticationError('Token Miss')
  }
  try {
    return verify(token.split(' ')[1], TokenKey)
  } catch (e) {
    throw new AuthenticationError('Invalid Token')
  }
}
