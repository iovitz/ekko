import 'reflect-metadata'
import KoaRouter from 'koa-router'
import { Context, Next, ParameterizedContext } from 'koa'
import Ajv, { Schema } from 'ajv'
import bodyParser from 'koa-bodyparser'
import appConfig from '@/config/app_config'
import { ClientError } from '../errors/errors'
import { BaseController } from './base.controller'
import { printer } from '../printer'

type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'

const { global_router_prefix: globalRouterPrefix } = appConfig.getConfig()
export const rootRouter = new KoaRouter({
  prefix: globalRouterPrefix
})

export interface KoaContext<TParams extends {} = {}, TBody = any, TData = any> extends Context {
  params: TParams
  request: ParameterizedContext['request'] & {
    body: TBody
  }
  body: TData
  user: {
    id: number
  }
}
export type KoaPostContext<TBody = any, TData = any> = KoaContext<{}, TBody, TData>
export type KoaGetContext<TParams extends {} = {}> = KoaContext<TParams>

const ajv = new Ajv()
function reqProcess(methodType: MethodType) {
  return function (path: `/${string}`, paramsSchema?: Schema) {
    const validate = paramsSchema ? ajv.compile(paramsSchema) : null
    return function (targetPrototype: any, methodName: string, descriptor: PropertyDescriptor) {
      const originFn = targetPrototype[methodName]
      descriptor.value = async function (ctx: Context, next: Next) {
        if (validate) {
          let data: Record<string, any> = {}
          if (ctx.method.toLocaleLowerCase() === 'get') {
            data = ctx.query || {}
          } else {
            data = (ctx.request.body as any) || {}
          }
          const valid = validate(data)
          if (!valid) {
            printer.error(validate.errors)
            throw new ClientError('Params validate error.')
          }
        }
        await originFn(ctx, next)
      }
      Reflect.defineMetadata('path', path, targetPrototype, methodName)
      Reflect.defineMetadata('methodType', methodType, targetPrototype, methodName)
    }
  }
}

export const Controller = (module: `/${string}`) => {
  const modulePath = module === '/' ? '' : module
  return (targetClass: new (...args: any[]) => BaseController) => {
    const router = new KoaRouter({
      prefix: modulePath
    })
    const { prototype } = targetClass
    Reflect.ownKeys(prototype).forEach((key) => {
      if (key !== 'constructor') {
        const fn = prototype[key]
        const path = Reflect.getMetadata('path', prototype, key)
        const methodType: MethodType = Reflect.getMetadata('methodType', prototype, key)
        if (!path || !methodType) return
        router[methodType](path, fn)
      }
    })
    rootRouter.use(router.routes())
    rootRouter.use(router.allowedMethods({}))
  }
}

export const Get = reqProcess('get')
export const Post = reqProcess('post')
export const Put = reqProcess('put')
export const Patch = reqProcess('patch')
export const Delete = reqProcess('delete')
