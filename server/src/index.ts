import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import cors from "cors";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import dotenv from "dotenv";
import connectRedis from "connect-redis";
import session from "express-session";
import { BASE_URL, COOKIE_NAME, __prod__ } from "./constants";
import { createContext } from "./context";
import { schemaWithMiddleware } from "./schema";
import { redis } from "./redis";
import { graphqlUploadExpress } from "graphql-upload";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

dotenv.config();

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    cors({
      origin: BASE_URL,
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
    })
  );

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema: schemaWithMiddleware }, wsServer);

  const apolloServer = new ApolloServer({
    schema: schemaWithMiddleware,
    context: createContext,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apolloServer.start();

  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: BASE_URL,
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 4000;

  await new Promise<void>((resolve) => {
    httpServer.listen(PORT);
    resolve();
  });

  console.log(
    `Express server running at http://localhost:${PORT}. Apollo server running at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
};

startServer().catch((err) => console.log("Error starting server", err));
