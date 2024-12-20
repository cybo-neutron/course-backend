import logger from "@utils/logger";
import { Request, Response } from "express";
import * as ContentRepo from "@app/content/content.repo";
import {
  createPreSignedUrlToUploadData,
  getFilePresignedUrl,
} from "@services/aws.service";
import env from "lib/env";
import { v4 as uuidv4 } from "uuid";
import { ContentType } from "db/schema/content.schema";

// get all contents of a course
export async function getAllContent(req: Request, res: Response) {
  try {
    const { courseId } = req.params;

    const allContent = await ContentRepo.getAllContent(courseId);

    res.status(200).json({
      payload: allContent,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getAllPublishedContent(req: Request, res: Response) {
  try {
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getContent(req: Request, res: Response): Promise<void> {
  try {
    const { courseId, contentId } = req.query;

    const content = await ContentRepo.getContent({
      courseId,
      contentId,
    });

    // based on content.type, return signedURl
    if (content && content.length > 0) {
      const contentType = content[0].type;
      if (["image", "video", "pdf"].includes(contentType)) {
        const [bucketName, fileKey] = content[0].main_content.split("::");
        const signedURL = await getFilePresignedUrl(bucketName, fileKey);

        return res.status(200).json({
          payload: {
            ...content[0],
            main_content: signedURL,
          },
        });
      }
    }

    return res.status(200).json({
      payload: content,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function verifyContent(req: Request, res: Response) {
  try {
    const { filename } = req.body;
    const bucketName = `${env.AWS_CONTENT_BUCKET_NAME}`;
    const fileKey = `content/${uuidv4()}-${filename}`;

    const signedUrl = await createPreSignedUrlToUploadData(bucketName, fileKey);

    res.status(200).json({
      payload: {
        bucketName,
        fileKey,
        signedUrl,
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function createContent(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      main_content,
      type,
      parentContentId,
      courseId,
    } = req.body;

    const content = await ContentRepo.createContent({
      title,
      description,
      main_content,
      type,
      parentContentId,
      courseId,
    });

    res.status(201).json({
      payload: content,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
