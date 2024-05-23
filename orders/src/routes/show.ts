import { Router, Request, Response } from "express";

const router = Router();

router.get("/api/orders/:orderId", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Order fetched successfully",
    data: {},
  });
});

export { router as showOrderRouter };
