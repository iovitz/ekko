import { Context, Next } from 'koa'
import { ServerResponseCode, ServerResponseStatus } from '@/common/constants'
import { ErrorBase, UnhandleExceptionError } from '../errors/errors'
import { printer } from '../printer'
import { verifyToken } from '../crypto/crypto'

export async function globalMiddleware(ctx: Context, next: Next) {
  try {
    const { method, header } = ctx.request

    const now = new Date()
    printer.info(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`, method, ctx.path)
    const token = header.authorization
    verifyToken(ctx.path, token)
    ctx.user = verifyToken(ctx.path, token)
    await next()
    if (ctx.body) {
      ctx.body = {
        code: ServerResponseCode.Success,
        status: ServerResponseStatus.Success,
        data: ctx.body
      }
    } else {
      ctx.body = {
        code: ServerResponseCode.NotExist,
        status: 'Not found.'
      }
      ctx.status = 404
    }
  } catch (err) {
    if (err instanceof ErrorBase) {
      ctx.body = err.toJSON()
    } else if (err instanceof Error) {
      printer.error(err.message)
      ctx.body = new UnhandleExceptionError(err.message || 'Server error').toJSON()
    }
  }
}
