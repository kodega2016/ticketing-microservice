import express, { Request, Response } from "express";
import { currentUser, requireAuth } from "@kodeapps/common";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    res.status(200).json({
      message: "current user is fetched successfully",
      data: req.currentUser || null,
    });
  }
);

export { router as currentUserRouter };
