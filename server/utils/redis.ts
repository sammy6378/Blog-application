import { Redis } from "ioredis";
require("dotenv").config();

//export const redis = new Redis(process.env.REDIS_URL as string)
const redisConnection = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis Connected");
    return process.env.REDIS_URL;
  } else {
    throw new Error("Error connecting to redis");
  }
};

export const redis = new Redis(redisConnection());