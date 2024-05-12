import { Request, Response, Router } from "express";
import { BadRequestError, validator } from "@kodeapps/common";
import { User } from "../models/user";
import { signinValidator } from "../validators/signin";
import PasswordHasher from "@kodeapps/common/build/services/password_hasher";

const router = Router();

router.post(
  "/api/users/signin",
  signinValidator,
  validator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    // check if the password is correct
    const isPasswordMatched = PasswordHasher.compare(
      existingUser.password,
      password
    );

    if (!isPasswordMatched) {
      throw new BadRequestError("Password didnot matched,Try again");
    }

    const userJwt = existingUser.generateAuthToken();

    // set the jwt token in the session
    req.session = { jwt: userJwt };

    res.status(200).json({
      message: "signed in successfully",
      data: existingUser,
    });
  }
);

export { router as signinRouter };
