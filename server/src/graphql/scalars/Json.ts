import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { asNexusMethod } from "nexus";

export const json = asNexusMethod(GraphQLJSON, "json");
export const jsonObject = asNexusMethod(GraphQLJSONObject, "jsonObject");
