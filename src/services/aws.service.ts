import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { readFileSync } from "fs";
import env from "lib/env";
import path from "path";

const client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile() {
  const filePath = path.join(__dirname, "file.jpg");

  const fileContent = readFileSync(filePath);

  const command = new PutObjectCommand({
    Body: fileContent, // content that needs to be uploaded
    Bucket: "neer-ici-upload", // bucket name
    Key: "file.jpg", // name of the file in s3 bucket
    // ACL: "public-read", // if you want the file to be publicly accessible
  });

  const response = await client.send(command);
}

export async function getFilePresignedUrl(bucketName: string, fileKey: string) {
  const getCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  });

  const response = await getSignedUrl(client, getCommand);
  return response;
}

export async function createPreSignedUrlToUploadData(
  bucketName: string,
  fileKey: string
) {
  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  });

  const response = await getSignedUrl(client, putCommand);

  return response;
}

