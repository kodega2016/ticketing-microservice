import { Request, Response, Router } from "express";
import { signinValidator } from "../validators/signin";
import { validator } from "../middlewares/validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
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
    const isPasswordMatched = Password.compare(existingUser.password, password);

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
