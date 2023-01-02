import 'reflect-metadata'
import KoaRouter from 'koa-router'
import { Context, ParameterizedContext } from 'koa'
import Ajv, { Schema } from 'ajv'
import appConfig from '@/config/app_config'
import { ClientError } from '../errors/errors'

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
}
// export type KoaContext<TData extends {} = {}, TParams extends {} = any, TBody extends {} = any, TState extends {} = any> = ParameterizedContext<
//   TState,
//   IRouterParamContext<TState, TParams> & {
//     params: TParams
//   },
//   TData
// > & {
//   request: {
//     body: TBody
//   }
// }

rootRouter.get('test', (ctx) => {})

const data: any = {}

let prop: any
function reqProcess(methodType: MethodType) {
  return function (path: `/${string}`, paramsSchema?: Schema | string) {
    return function (targetPrototype: any, methodName: string, descriptor: PropertyDescriptor) {
      prop = targetPrototype
      const originFn = targetPrototype[methodName]
      targetPrototype[methodName] = async function (...args: any[]) {
        const ajv = new Ajv()
        if (paramsSchema) {
          const data = methodType === 'get' ? '123' : '444'
          const valid = ajv.validate(paramsSchema, data)
          if (!valid) {
            throw new ClientError(ajv.errors || '参数错误')
          }
        }
        await originFn.apply(this, ...args)
      }
      Reflect.defineMetadata('path', path, targetPrototype, methodName)
      Reflect.defineMetadata('methodType', methodType, targetPrototype, methodName)
    }
  }
}

export const Controller = (module: `/${string}`) => {
  const modulePath = module === '/' ? '' : module
  return (targetClass: new (...args: any[]) => any) => {
    const router = new KoaRouter({
      prefix: modulePath
    })
    const { prototype } = targetClass
    console.log('uuu', prototype === prop)
    console.log(prototype)
    Reflect.ownKeys(prototype).forEach((key) => {
      if (key !== 'constructor') {
        const fn = prototype[key]
        console.log(fn === data[key])
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
