import {Resolver, Query, Arg, Mutation, Ctx} from "type-graphql";
import {User} from "../entities/User";
import {UserResponse} from "../types/user.types";
import {getRepository} from "typeorm";
import {CreateUserInput} from "../inputs/createUserInput";
import {MyCtx} from "../types/myCtx";

@Resolver()
export class UserResolver {

    @Query(()=>User,{nullable:true})
   async me(@Ctx(){req}:MyCtx){
        if(!req.session.userID){
            return null
        } else {

            return await User.findOne({id:req.session.userID})
        }
    }

    @Query(() => [UserResponse])
    users() {
        return getRepository(User).find();
    }
    @Query(() => UserResponse)
    async getUserByID(@Arg("id") id: number):Promise<UserResponse> {
        const user = await User.findOne({ where: { id }});
        if(!user){
            return {
                errors:[{
                    field: 'Users',
                    message: "The ID provided doesn't exist"
                }
                ]
            }
        } else {
            return {user}
        }
    }
    @Query(()=>UserResponse)
    async getUserByName(@Arg('name' )username:string):Promise<UserResponse>{
        const user = await User.findOne({ where: { username }});
        if(!user){
            return {
                errors:[{
                    field: 'Users',
                    message: "The username provided doesn't exist"
                }
                ]
            }
        } else {
            return {user}
        }
    }
    @Mutation(()=>UserResponse)
    async logIn(@Arg("data") data:CreateUserInput,
                @Ctx(){req}:MyCtx):Promise<UserResponse>{
        const user = await User.findOne({username:data.username})
        if(!user){
            return {
                errors:[{
                    field: 'Login',
                    message: "The information provided is not correct, Try again please!"
                }]
            }
        } else {
            if(data.password===user.password){
                req.session.userID=user.id
                return {user}
            }else{
                return {
                    errors:[{
                        field: 'Login',
                        message: "The information provided is not correct, Try again please!"
                    }]
                }
            }
        }
    }
    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyCtx) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie("token");
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            })
        );
    }
    @Mutation(() => UserResponse)
    async createUser(@Arg("data") data: CreateUserInput,
                     @Ctx(){req}:MyCtx):Promise<UserResponse> {
        const user = User.create(data);
        try{
            await user.save();
            req.session.userID=user.id
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