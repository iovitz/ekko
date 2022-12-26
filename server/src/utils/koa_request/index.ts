import 'reflect-metadata'
import KoaRouter from 'koa-router'
import { Context, ParameterizedContext } from 'koa'

type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const rootRouter = new KoaRouter({
  prefix: '/api'
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

function reqProcess(methodType: MethodType) {
  return function (path: `/${string}`) {
    return function (targetPrototype: any, methodName: string, descriptor: PropertyDescriptor) {
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
    Reflect.ownKeys(prototype).forEach((key) => {
      const fn = prototype[key]
      const path = Reflect.getMetadata('path', prototype, key)
      const methodType: MethodType = Reflect.getMetadata('methodType', prototype, key)
      if (!path || !methodType) return
      router[methodType](path, fn)
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
