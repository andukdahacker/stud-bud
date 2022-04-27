import { applyMiddleware } from "graphql-middleware";
import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";
import { middleware } from "./middlewares/permission";

const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "nexus-typegen.ts"),
    schema: join(__dirname, "schema.graphql"),
  },
  contextType: {
    module: require.resolve("./context"),
    alias: "Context",
    export: "Context",
  },
});

export const schemaWithMiddleware = applyMiddleware(schema, middleware);
