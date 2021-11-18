import "reflect-metadata";
require('dotenv').config();
import {UserResolver} from "./resolvers/UserResolver";
import {buildSchema} from "type-graphql";
import {createConnection} from "typeorm";
import {ApolloServer} from "apollo-server";
import {FilmsResolver} from "./resolvers/FilmsResolver";

 async function main() {
   await createConnection()
    const schema = await buildSchema({
        resolvers: [UserResolver, FilmsResolver],
      validate:false
    })
    const server = new ApolloServer({ schema })
    await server.listen(process.env.PORT)
     const PORT = process.env.PORT||4000
    console.log(`Server has started at ${PORT}!`)
}
main().catch((err) => {
    console.error(err);
})