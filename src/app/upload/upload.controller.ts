import logger from "@utils/logger";
import { Response, Request } from "express";

import { createPreSignedUrlToUploadData } from "@services/aws.service";

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
