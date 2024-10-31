import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType()
export class UserInput {
  @Field()
  id: string

  @Field()
  desc: string
}
