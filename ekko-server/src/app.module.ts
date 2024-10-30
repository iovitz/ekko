import { homedir } from 'node:os'
import { join } from 'node:path'
import * as process from 'node:process'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { DefaultFilter } from './aspects/filters/default/default.filter'
import { HttpFilter } from './aspects/filters/http/http.filter'
import { LogInterceptor } from './aspects/interceptors/log/log.interceptor'
import { PreparePromiseInterceptor } from './aspects/interceptors/prepare-promise/prepare-promise.interceptor'
import { ResponseFormatterInterceptor } from './aspects/interceptors/response-formatter/response-formatter.interceptor'
import { InjectorMiddleware } from './aspects/middlewares/injector/injector.middleware'
import { ServicesModule } from './services/services.module'
import { TracerService } from './services/tracer/tracer.service'
import { SocketV1Module } from './socketv1/socketv1.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env', // 默认配置文件
        // 选择配置类型
        ['production'].includes(process.env.APP_NAME_NODE_ENV)
          ? '.env.production'
          : '.env.development',
      ],
      load: [
        // 可以加载远程配置
        async () => {
          const isProd = process.env.NODE_ENV === 'production'

          return {
            isProd,
          }
        },
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,

      // playground访问
      playground: true,
      path: 'graphql/playground',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const isProd = config.get('isProd')
        return {
          type: 'better-sqlite3',

          // 数据放在 ~/sqlite 目录下
          database: join(homedir(), 'sqlite', 'ekko.sqlite'),

          // 按需启动
          synchronize: false,
          logging: !isProd,

          // eslint-disable-next-line node/no-path-concat
          entities: [`${__dirname}/**/*.entity{.ts,.js}`], // 这个实体是编译后的dist下
          timezone: '+08:00',
        }
      },
      inject: [ConfigService],
    }),
    ServicesModule,
    EventEmitterModule.forRoot(),
    SocketV1Module,
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatterInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PreparePromiseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: DefaultFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(
    private config: ConfigService,
    private tracer: TracerService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    this.tracer.log('Initial middlewares')
    consumer
      .apply(
        cookieParser(),
        session({
          secret: this.config.getOrThrow('SESSION_SECRET'),
          resave: false,
          saveUninitialized: false,
        }),
        // middleware中主要用来注入工具函数
        InjectorMiddleware,
      )
      .forRoutes('*')
  }
}
