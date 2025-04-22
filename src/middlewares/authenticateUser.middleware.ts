import { verifyAccessToken } from "@app/auth/auth.service";
import logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    throw new Error("Authorization header not present");
  }

  try {
    const token = authHeader.split(" ")[1];

    const decodedToken = verifyAccessToken(token);
    logger.info(`User ${decodedToken?.email} authenticated`);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};
