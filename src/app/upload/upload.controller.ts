import logger from "@utils/logger";
import { Response, Request } from "express";

import { createPreSignedUrlToUploadData } from "@services/aws.service";
import fileUploadProducer from "@/queues/producers/file_upload_producer";

export const getPreSignedUrlToUploadContent = async (
  req: Request,
  res: Response
) => {
  try {
    const { bucketName, fileKey } = req.body;

    logger.info({
      bucketName,
      fileKey,
    });

    const preSignedUrl = await createPreSignedUrlToUploadData(
      bucketName,
      fileKey
    );

    res.status(200).json({
      payload: {
        preSignedUrl,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const notifyUploadComplete = async (req: Request, res: Response) => {
  try {
    const { bucketName, fileKey } = req.body;
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

    fileUploadProducer.add(`${bucketName}::${fileKey}`, {
      bucketName,
      fileKey,
    });

    res.status(200).json({
      payload: {
        message: "file uplaod queued successfully",
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};
