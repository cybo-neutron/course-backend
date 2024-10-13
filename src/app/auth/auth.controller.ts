import { Request, Response } from "express";
import { UserAlreadyExistError } from "./auth.errors";
import { createUser } from "./auth.repo";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.json({ message: "Login" });
};

const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const createdUser = await createUser({
      firstName,
      lastName,
      email,
      password,
      role: UserRoles.USER,
    });
    res.json({ message: "User created successfully", payload: createdUser });
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      res.status(400).json({ message: error.message });
    }
  }
};

const logout = async (req: Request, res: Response) => {
  res.json({ message: "Logout" });
};

const refresh = async (req: Request, res: Response) => {
  res.json({ message: "Refresh" });
};

const forgotPassword = async (req: Request, res: Response) => {
  res.json({ message: "Forgot Password" });
};

export default { login, register, logout, refresh, forgotPassword };
