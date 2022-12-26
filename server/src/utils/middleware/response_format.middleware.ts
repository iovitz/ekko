import { Context, Next } from 'koa'
import { ServerResponseCode, ServerResponseStatus } from '@/common/constants'
import { ErrorBase, UnhandleExceptionError } from '../errors/errors'
import { printer } from '../printer'

export async function responseFormat(ctx: Context, next: Next) {
  try {
    const { method } = ctx.request
    const now = new Date()
    printer.info(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`, ctx.request.method, ctx.path)
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
      ctx.body = new UnhandleExceptionError(err.message || 'Server error').toJSON()
    }
  }
}
