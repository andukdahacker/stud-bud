import { PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";
import { Request, Response } from "express";
import { prisma } from "./prisma";
import { Redis } from "ioredis";
import { redis } from "./redis";

export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  redis: Redis;
}

//declaration merge to inject userId into express session object
declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

export const createContext = async (
  request: ExpressContext
): Promise<Partial<Context>> => {
  const context: Context = {
    ...request,
    req: request.req,
    res: request.res,
    prisma,
    redis,
  };

  return context;
};
