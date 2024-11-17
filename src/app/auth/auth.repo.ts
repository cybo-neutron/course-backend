import db from "db/db";
import { User, UserSchema } from "db/schema/user";
import { eq } from "drizzle-orm";
import { UserAlreadyExistError, UserNotFoundError } from "./auth.errors";
import logger from "@utils/logger";

export const createUser = async (data: UserSchema) => {
  const findUser = await db
    .select()
    .from(User)
    .where(eq(User.email, data.email))
    .limit(1);

  if (findUser && findUser.length>0) {
    logger.error("User you are trying to create already exist");
    throw new UserAlreadyExistError("User already exist");
  }

  const user = await db.insert(User).values(data).returning();
  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(User)
    .where(eq(User.email, email))
    .limit(1);

  if (!user || user.length === 0) {
    throw new UserNotFoundError(`User not found with email : ${email}`);
  }

  return user[0];
};
