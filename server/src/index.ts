import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import cors from 'cors';
import connectRedis from 'connect-redis';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ContextFunction,
} from 'apollo-server-core';
import session from 'express-session';
import { User } from './entities/User';
import { Films } from './entities/Films';
import { FilmsResolver } from './resolvers/FilmsResolver';
import { UserResolver } from './resolvers/UserResolver';

require('dotenv').config();

const redis = require('redis');

async function main(): Promise<void> {
  const connection = await createConnection({
    type: 'sqlite',
    database: './db.sqlite3',
    entities: [User, Films],
    synchronize: true,
  });
  await connection.runMigrations();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });
  const app = express();

  app.use(
    cors({
      origin: [process.env.CLIENT_URL as string],
      credentials: true,
    })
  );

  app.use(
    session({
      name: 'token',
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
      },
      saveUninitialized: false,
      secret: process.env.SECRET as string,
      resave: false,
    })
  );
  const schema = await buildSchema({
    resolvers: [UserResolver, FilmsResolver],
    validate: false,
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({
      req,
      res,
    }): object | ContextFunction<ExpressContext> | undefined => ({
      req,
      res,
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginLandingPageDisabled(),
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}!`);
  });
}
main().catch((err) => {
  console.error(err);
});
