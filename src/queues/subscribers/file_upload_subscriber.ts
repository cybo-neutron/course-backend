import queueList from "@/queues/queue_list";
import { getFileFromS3andUploadtoS3 } from "@/services/aws.service";
import { RedisConnection } from "@/utils/cache/redis";
import logger from "@/utils/logger";
import { Job, Worker } from "bullmq";

const fileUploadSubscriber = new Worker(
  queueList.file_upload.name,
  async (job) => {
    const { bucketName, fileKey, fromDirectory, targetDirectory } = job.data;

    const fromFileKey = `${fromDirectory}/${fileKey}`;
    const toFileKey = `${targetDirectory}/${fileKey}`;

    try {
      await getFileFromS3andUploadtoS3({
        fromBucket: bucketName,
        targetBucket: bucketName,
        fileKey: fromFileKey,
        targetFileKey: toFileKey,
      });
    } catch (error) {
      logger.error(
        `[fileUploadSubscriber] video transcoding failed`,
        job,
        error
      );
    }

    logger.info(`[fileUploadSubscriber] video transcoding complete`, job);
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
