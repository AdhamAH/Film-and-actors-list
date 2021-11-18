import {Resolver, Query, Arg, Mutation} from "type-graphql";
import {User} from "../entities/User";
import {UserResponse} from "../types/user.types";
import {getRepository} from "typeorm";
import {CreateUserInput} from "../inputs/createUserInput";

@Resolver()
export class UserResolver {
    @Query(() => [UserResponse])
    users() {
        return getRepository(User).find();
    }
    @Mutation(() => UserResponse)
    async createUser(@Arg("data") data: CreateUserInput):Promise<UserResponse> {
        const user = User.create(data);
        try{
            await user.save();
            return {user};
        } catch (error){
             if(error.errno===19){
             return {
                 errors:[{
                     field: "Create User",
                     message: "This username is already taken, please try another username."
                 }]
             }
             } else {
                 return {
                     errors:[{
                         field: 'Create User',
                         message: error.message
                     }]
                 }
             }
        }

    }

}