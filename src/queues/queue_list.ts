import { RedisConnection } from "@utils/cache/redis";

const redisConnection = RedisConnection;

const queueList = {
  file_upload: {
    name: "file_upload",
    connection: redisConnection,
  },
};

export default queueList;
