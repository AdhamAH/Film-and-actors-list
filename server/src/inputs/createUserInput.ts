import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
