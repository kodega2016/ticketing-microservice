import express, { Response, Request } from "express";
const router = express.Router();
import { User } from "../models/user";
import { signupValidator } from "../validators/signup";
import { BadRequestError, validator } from "@kodeapps/common";

router.post(
  "/api/users/signup",
  signupValidator,
  validator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email address is already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // generate jwt
    const userJwt = user.generateAuthToken();
    // store it on the session object
    req.session = { jwt: userJwt };

    res.status(201).json({
      message: "signed up successfully",
      data: user,
    });
  }
);

export { router as signupRouter };
