import logger from "@utils/logger";
import { Response, Request } from "express";

import { createPreSignedUrlToUploadData } from "@services/aws.service";
import fileUploadProducer from "@/queues/producers/file_upload_producer";
import { seperateFileExtension } from "@/utils/file_extension";
import { v4 as uuidv4 } from "uuid";
import { transcodeVideo } from "@/services/transcode.service";

export const getPreSignedUrlToUploadContent = async (
  req: Request,
  res: Response
) => {
  try {
    const { bucketName, fileKey, fileDirectory } = req.body;

    const { name, extension } = seperateFileExtension(fileKey);
    const modifiedFileKey = `${name}-${uuidv4()}.${extension}`;

    const preSignedUrl = await createPreSignedUrlToUploadData(
      bucketName,
      `${fileDirectory}/${modifiedFileKey}`
    );

    res.status(200).json({
      payload: {
        preSignedUrl,
        fileKey: modifiedFileKey,
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const transcodeVideo_v1 = async (req: Request, res: Response) => {
  try {
    const { bucketName, fileKey, fromDirectory, targetDirectory } = req.body;

    if (!bucketName || bucketName === "") {
      res.status(400).json({
        error: "Bucket name missing!!",
      });
    }

    if (!fileKey || fileKey === "") {
      res.status(400).json({
        error: "fileKey missing!!",
      });
    }

    if (!fromDirectory || fromDirectory === "") {
      res.status(400).json({
        error: "fromDirectory missing!!",
      });
    }

    if (!targetDirectory || targetDirectory === "") {
      res.status(400).json({
        error: "targetDirectory missing!!",
      });
    }

    fileUploadProducer.add(`${bucketName}::${fileKey}`, {
      bucketName,
      fileKey,
      fromDirectory,
      targetDirectory,
    });

    res.status(200).json({
      payload: {
        message: "file upload queued successfully",
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const transcodeVideo_v2 = async (req: Request, res: Response) => {
  try {
    const { fromBucket, fileKey } = req.body;

    console.log(`[transcodeVideo_v2] : `, {
      fromBucket,
      fileKey,
    });

    await transcodeVideo({
      fromBucket,
      fileKey,
    });

    logger.info(`[transcodeVideo_v2] transcoding complete!!!`);
    res.status(200).json({
      message: "Transcoded successfully!!",
    });
  } catch (err) {
    logger.error("Error transcoding ", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
