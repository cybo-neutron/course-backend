import { RedisConnection } from "@utils/cache/redis";
import { Queue } from "bullmq";
import queueList from "queues/queue_list";

const redisConnection = RedisConnection;

const fileUploadProducer = new Queue(queueList.file_upload.name, {
  connection: redisConnection,
});

export default fileUploadProducer;
