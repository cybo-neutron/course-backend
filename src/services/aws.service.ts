import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createWriteStream, readFileSync } from "fs";
import env from "lib/env";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { PassThrough, Readable } from "stream";
import logger from "@/utils/logger";
import { saveToDisk } from "./transcode.service";

export const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

// to view file
export async function getFilePresignedUrl(bucketName: string, fileKey: string) {
  const getCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  });

  const response = await getSignedUrl(s3Client, getCommand);
  return response;
}

// to upload file
export async function createPreSignedUrlToUploadData(
  bucketName: string,
  fileKey: string
) {
  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  });

  const response = await getSignedUrl(s3Client, putCommand);

  return response;
}

export async function getFileFromS3andUploadtoS3({
  fromBucket,
  targetBucket,
  fileKey,
  targetFileKey,
}: {
  fromBucket: string;
  targetBucket: string;
  fileKey: string;
  targetFileKey: string;
}) {
  logger.info(`[getFileFromS3andUploadtoS3] start`, {
    fromBucket,
    targetBucket,
    fileKey,
    targetFileKey,
  });
  const getCommand = new GetObjectCommand({
    Bucket: fromBucket,
    Key: fileKey,
  });
  const getResponse = await s3Client.send(getCommand);
  const inputStream = getResponse.Body as Readable;

  if (inputStream) {
    const outputPath = path.join(__dirname, "../../video/", fileKey);
    await saveToDisk({
      inputStream,
      outputPath,
    });

    const outputStream = new PassThrough();
    // transcode the video
    ffmpeg()
      .input(outputPath)
      .format("mp4")
      .videoCodec("libx264")
      .pipe(outputStream, { end: true });

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: targetBucket,
        Key: targetFileKey,
        Body: outputStream,
        ContentType: `video/mp4`,
      },
    });

    logger.info(`[getFileFromS3andUploadtoS3] transcoding complete`, {
      fromBucket,
      targetBucket,
      fileKey,
      targetFileKey,
    });

    await upload.done();
  }
}
