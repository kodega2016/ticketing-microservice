import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Jwt } from "../services/jwt";
import { User } from "../models/user";
const router = express.Router();

router.get("/api/users/currentuser", async (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.status(200).json({
      message: "currentuser is fetched successfully",
      data: null,
    });
  }
  try {
    const payload = Jwt.verify(req.session.jwt);
    const user = await User.findById(payload.id);
    res.status(200).json({
      message: "currentuser is fetched successfully",
      data: user,
    });
  } catch (err) {
    throw new BadRequestError("invalid token");
  }
});

export { router as currentUserRouter };
