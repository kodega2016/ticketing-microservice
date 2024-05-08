import { Request, Response, Router } from "express";
import { signinValidator } from "../validators/signin";
import { validator } from "../middlewares/validator";
const router = Router();

router.post(
  "/api/users/signin",
  signinValidator,
  validator,
  (req: Request, res: Response) => {
    res.status(200).json({
      message: "signed in successfully",
      data: null,
    });
  },
);

export { router as signinRouter };
