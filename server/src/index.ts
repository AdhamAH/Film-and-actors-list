import "reflect-metadata";
require('dotenv').config();
import {UserResolver} from "./resolvers/UserResolver";
import {buildSchema} from "type-graphql";
import {createConnection} from "typeorm";
import {FilmsResolver} from "./resolvers/FilmsResolver";
import express from "express";
import {ApolloServer} from "apollo-server-express";
 async function main() {
   await createConnection()
     const app = express();
    const schema = await buildSchema({
        resolvers: [UserResolver, FilmsResolver],
      validate:false
    })
    const apolloServer = new ApolloServer({ schema })
    await apolloServer.start()
     apolloServer.applyMiddleware({
         app,
         cors: process.env.NODE_ENV==="development",
     });
     const PORT = process.env.PORT||4000
     app.listen(PORT,()=>{
         console.log(`Server has started at ${PORT}!`)
     })

}
main().catch((err) => {
    console.error(err);
})