import bcrypt from "bcrypt";
import env from "lib/env";
import jwt from "jsonwebtoken";
import logger from "@utils/logger";
import { TokenInvalidError } from "./auth.errors";
import { NextFunction, Request, Response } from "express";

export const verifyPassword = async (
  password: string,
  passwordHash: string
) => {
  return await bcrypt.compare(password, passwordHash);
};

export function generatateToken(payload: {
  userId: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE_DURATION,
  });
}

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded;
  } catch (error) {
    logger.error(error);
    throw new TokenInvalidError(error.message);
  }
}

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    throw new Error("Authorization header not present");
  }

  try {
    const token = authHeader.split(" ")[1];

    const decodedToken = verifyAccessToken(token);
    logger.info(`User ${decodedToken?.email} authenticated`);
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(403).json({
      message: error.message,
    });
  }
}
