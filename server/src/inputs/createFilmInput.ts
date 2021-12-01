import {Field, InputType} from "type-graphql";

@InputType()
export class CreateFilmInput{
    @Field()
    title: string

    @Field()
    playTime: Date

}