import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { UserResolver } from './user/user.resolver'
import { UserService } from './user/user.service'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],

      // playground访问
      playground: true,
      path: 'graphql/playground',
    }),
  ],
  providers: [UserResolver, UserService],
})
export class GraphqlModule {}
