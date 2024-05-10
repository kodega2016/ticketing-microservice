import { Request, Response, NextFunction } from "express";
import { Jwt } from "../services/jwt";
import { User } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload | null;
    }
  }
}

interface UserPayload {
  id: string;
  email: string;
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = Jwt.verify(req.session.jwt);
    const user = await User.findById(payload.id);
    req.currentUser = {
      id: user!.id,
      email: user!.email,
    };
  } catch (err) {}
  next();
};
