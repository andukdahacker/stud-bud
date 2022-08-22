import { __prod__ } from "./constants";

export const PORT = __prod__ ? process.env.PORT : 4000;
export const REDIS_HOST = __prod__ ? process.env.REDIS_HOST : "redis";
export const SESSION_SECRET = __prod__ ? process.env.SESSION_SECRET : "xxx";
export const BASE_URL = __prod__
  ? (process.env.BASE_URL as string)
  : "http://localhost:3000";
