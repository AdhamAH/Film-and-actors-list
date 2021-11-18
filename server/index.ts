import "reflect-metadata";
require('dotenv').config();
import {buildSchema} from "type-graphql";
import {createConnection} from "typeorm";
import {ApolloServer} from "apollo-server";
import {TestResolver} from "./resolvers/TestResolver";

async function main() {
  await createConnection()
    const schema = await buildSchema({
        resolvers: [TestResolver],
        validate:false
    })
    const server = new ApolloServer({ schema })
    const PORT = process.env.PORT||4000
    await server.listen(PORT)
    console.log(`Server has started at ${PORT}!`)
}
main().catch((err) => {
    console.error(err);
})