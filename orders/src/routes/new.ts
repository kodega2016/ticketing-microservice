import { Router, Request, Response } from "express";
const router = Router();

router.post("/api/orders", (req: Request, res: Response) => {
  res.status(201).json({
    message: "Order created successfully",
    data: null,
  });
});

export { router as newOrderRouter };
