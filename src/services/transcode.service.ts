import logger from "@utils/logger";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import { getFilePresignedUrl, s3Client } from "./aws.service";
import { PassThrough, Readable } from "stream";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { createWriteStream } from "fs";
import { finished } from "stream/promises";

// export async function transcodeVideo() {
//   const dir = __dirname;
//   const videopath = path.join(__dirname, "../../video/hubspot-data-sync.mov");
//   const outputpath = path.join(__dirname, "../../video/", "output");
//   const outputpath_2 = path.join(__dirname, "../../video/", "output-2");

//   console.log(videopath);
//   ffmpeg()
//     .input(videopath)
//     .output(outputpath + ".mp4")
//     .output(outputpath_2 + ".mp4")
//     // .size('1080x?')
//     // .aspect("2:8")
//     .outputFormat("mp4")
//     .on("progress", (progress) => {
//       logger.info(`Processing : ${progress.percent?.toFixed(2)}% done`);
//     })
//     .on("end", () => {
//       logger.info("Finished processing");
//     });
//   // .run()

//   // -------- input from aws s3
//   // const bucket_name = 'neer-ici-upload';
//   // const file_key = 'content/fd332608-cd37-45a2-929c-9e4887f8cc81-tasks_permission_prod.mp4';

//   // const videoUrl = await getFilePresignedUrl(
//   //     bucket_name,
//   //     file_key
//   // )
//   // ffmpeg().input(videoUrl).output(outputpath).on('progress',(progress)=>{
//   //     logger.info(`Processing : ${progress.percent}% done`)
//   // }).on("end", () => {
//   //     logger.info("Finished processing")
//   // }).run()

//   //
// }

export async function transcodeVideo({
  fromBucket,
  fileKey,
}: {
  fromBucket: string;
  fileKey: string;
}) {
  const getCommand = new GetObjectCommand({
    Bucket: fromBucket,
    Key: fileKey,
  });
  const getResponse = await s3Client.send(getCommand);
  const inputStream = getResponse.Body;

  if (!(inputStream instanceof Readable)) {
    console.log("Error: inputStream is not a Readable stream");
    return;
  }

  const outputPath = path.join(__dirname, "../../video/", "output.mp4");
  const outputStream = createWriteStream(outputPath);

  ffmpeg()
    .input(inputStream)
    .format("mp4")
    .videoCodec("libx264")
    .audioCodec("aac")
    .outputOptions([
      "-movflags frag_keyframe+empty_moov", // needed for non-seekable output streams
      // '-preset ultrafast'
      "-c copy",
    ])
    .on("start", () => {
      console.log("started encoding");
    })
    .on("progress", (progress) => {
      console.log("progress : ", progress);
    })
    .on("end", () => {
      console.log("finished encoding");
    })
    .on("error", (error) => {
      console.log("error while ecoding : ", error);
    })
    .on("stderr", (line) => console.log("FFmpeg stderr:", line))
    .pipe(outputStream, {
      end: true,
    });

  await finished(outputStream);
  logger.info(`[transcodeVideo] transcoding complete`, { fromBucket, fileKey });
}

export async function saveToDisk({
  inputStream,
  outputPath,
}: {
  inputStream: Readable;
  outputPath: string;
}) {
  const outputStream = createWriteStream(outputPath);
  inputStream.pipe(outputStream);

  await finished(outputStream);
}
