import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  async (req: Request, res: Response) => {
    res.status(200).json({
      message: "currentuser is fetched successfully",
      data: req.currentUser || null,
    });
  }
);

export { router as currentUserRouter };
