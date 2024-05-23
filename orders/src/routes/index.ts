import { Request, Response, Router } from "express";
const router = Router();

router.get("/api/orders", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Orders fetched successfully",
    data: [],
  });
});

export { router as indexOrderRouter };
