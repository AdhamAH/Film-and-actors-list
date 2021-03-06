import { Field, ObjectType } from 'type-graphql';
import { FieldError } from './error.types';
import { Films } from '../entities/Films';

@ObjectType()
export class FilmResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Films, { nullable: true })
  film?: Films;
}
@ObjectType()
export class FilmResponsePagination {
  @Field(() => [Films], { nullable: true })
  films?: Films[];

  @Field(() => Boolean, { nullable: true })
  hasMore: boolean;
}
