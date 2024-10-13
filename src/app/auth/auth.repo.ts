import { db } from "db/db";
import { User, UserSchema } from "db/schema/user";
import { eq } from "drizzle-orm";
import { UserAlreadyExistError } from "./auth.errors";

export const createUser = async (data: UserSchema) => {
  try {
    const findUser = await db
      .select()
      .from(User)
      .where(eq(User.email, data.email))
      .limit(1);

    if (findUser) {
      throw new UserAlreadyExistError("User already exist");
    }

    const user = await db.insert(User).values(data).returning();
    return user;
  } catch (error) {}
};
