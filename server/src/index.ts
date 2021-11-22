import "reflect-metadata";
require('dotenv').config();
import {UserResolver} from "./resolvers/UserResolver";
import {buildSchema} from "type-graphql";
import {createConnection} from "typeorm";
import {FilmsResolver} from "./resolvers/FilmsResolver";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import cors from 'cors'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";





 async function main() {
  const connection = await createConnection()
   await  connection.runMigrations()
     const RedisStore = connectRedis(session)
     const redisClient = redis.createClient()
     const app = express();

     app.use(
         cors({
             origin: ["http://localhost:3000"],
             credentials: true,
         })
     );

     app.use(
         session({
             name:'token',
             store: new RedisStore({ client: redisClient, disableTouch:true }),
             cookie:{
               maxAge: 1000*60*60,
               httpOnly: true,
                 sameSite: 'lax',
               secure: process.env.NODE_ENV!=='development'
             },
             saveUninitialized: false,
             secret: process.env.SECRET as string,
             resave: false,
         })
     )
     const schema = await buildSchema({
         resolvers: [UserResolver, FilmsResolver],
         validate:false
     })
    const apolloServer = new ApolloServer({ schema,
    context: ({ req, res }) => ({
        req,
        res,
    }),
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
            , ApolloServerPluginLandingPageDisabled()
        ]
    })
    await apolloServer.start()
     apolloServer.applyMiddleware({
         app,
         cors: false,
 });
     const PORT = process.env.PORT||4000
     app.listen(PORT,()=>{
         console.log(`Server has started at ${PORT}!`)
     })

}
main().catch((err) => {
    console.error(err);
})