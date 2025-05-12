import queueList from "@/queues/queue_list";
import { RedisConnection } from "@/utils/cache/redis";
import logger from "@/utils/logger";
import { Job, Worker } from "bullmq";

const fileUploadSubscriber = new Worker(
  queueList.file_upload.name,
  async (job) => {
    const { bucket, fileKey } = job.data;
    console.log(job);
  },
  {
    connection: RedisConnection,
    concurrency: 3,
    autorun: false,
  }
);

fileUploadSubscriber.on("ready", () => {
  logger.info("[fileUploadSubscriber] ready!!");
});
fileUploadSubscriber.on("completed", () => {
  logger.info("[fileUploadSubscriber] job completed!!");
});
fileUploadSubscriber.on("error", (error) => {
  logger.info("[fileUploadSubscriber] error!!", error);
});
fileUploadSubscriber.on("failed", (job: Job | undefined, error: Error) => {
  logger.info("[fileUploadSubscriber] failed", job, error);
});

export default fileUploadSubscriber;
