import RedisClient from "@redis/client/dist/lib/client";
import { RedisClientType } from "redis";

export interface ISession {
  sid: string;
  uuid: string;
}

declare module 'hyper-express' {
  interface Request {
    session: ISession;
    redis: RedisClient;
  }
}