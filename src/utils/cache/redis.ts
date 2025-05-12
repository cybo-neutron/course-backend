import IORedis from "ioredis";

const RedisConnection = new IORedis({
  port: 6379,
  host: "127.0.0.1",
  maxRetriesPerRequest: null,
  // maxRetriesPerRequest: 2, // when executing a command ,  if redis is down try 2 times to connect and execute the command before throwing error
});

export { RedisConnection };
