import { Field, ObjectType } from 'type-graphql';
import { FieldError } from './error.types';
import { User } from '../entities/User';

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
