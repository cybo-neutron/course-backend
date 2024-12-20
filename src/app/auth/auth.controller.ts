import { Request, Response } from "express";
import {
  InvalidCredentialsError,
  TokenInvalidError,
  UserAlreadyExistError,
  UserNotFoundError,
} from "./auth.errors";
import { createUser, findUserByEmail } from "./auth.repo";
import { UserRoles, UserSchema } from "db/schema/user";
import bcrypt from "bcrypt";
import {
  generatateToken,
  verifyAccessToken,
  verifyPassword,
} from "./auth.service";
import logger from "@utils/logger";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    const user = await findUserByEmail(email);
    logger.info(user);

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError(
        `Invalid credentials for email ${email}`
      );
    }

    const accessToken = generatateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    res.json({
      payload: {
        accessToken,
        userId: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    logger.error(error);
    if (error instanceof UserNotFoundError) {
      return res.status(400).json({ message: error.message });
    }
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const createdUser = await createUser({
      firstName,
      lastName,
      email,
      password: passwordHash,
      role: UserRoles.USER,
    });
    const accessToken = generatateToken({
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
    });
    res.json({
      message: "User created successfully",
      payload: {
        accessToken,
      },
    });
  } catch (error) {
    logger.error(error);
    if (error instanceof UserAlreadyExistError) {
      return res.json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.json({ message: "Logout" });
};

export const refresh = async (req: Request, res: Response) => {
  res.json({ message: "Refresh" });
};

export const forgotPassword = async (req: Request, res: Response) => {
  res.json({ message: "Forgot Password" });
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    const decoded = verifyAccessToken(token);
    return res.status(200).json({ payload: decoded });
  } catch (error) {
    if (error instanceof TokenInvalidError) {
      return res
        .status(403)
        .json({ message: `Token invalid : ${error.message}` });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
