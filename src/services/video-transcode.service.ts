import logger from "@utils/logger";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import { getFilePresignedUrl } from "./aws.service";

export async function transcodeVideo() {
  const dir = __dirname;
  const videopath = path.join(__dirname, "../../video/hubspot-data-sync.mov");
  const outputpath = path.join(__dirname, "../../video/", "output");
  const outputpath_2 = path.join(__dirname, "../../video/", "output-2");

  console.log(videopath);
  ffmpeg()
    .input(videopath)
    .output(outputpath + ".mp4")
    .output(outputpath_2 + ".mp4")
    // .size('1080x?')
    // .aspect("2:8")
    .outputFormat("mp4")
    .on("progress", (progress) => {
      logger.info(`Processing : ${progress.percent?.toFixed(2)}% done`);
    })
    .on("end", () => {
      logger.info("Finished processing");
    });
  // .run()

  // -------- input from aws s3
  // const bucket_name = 'neer-ici-upload';
  // const file_key = 'content/fd332608-cd37-45a2-929c-9e4887f8cc81-tasks_permission_prod.mp4';

  // const videoUrl = await getFilePresignedUrl(
  //     bucket_name,
  //     file_key
  // )
  // ffmpeg().input(videoUrl).output(outputpath).on('progress',(progress)=>{
  //     logger.info(`Processing : ${progress.percent}% done`)
  // }).on("end", () => {
  //     logger.info("Finished processing")
  // }).run()

  //
}

// transcodeVideo()
