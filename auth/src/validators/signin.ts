import { body } from "express-validator";

const signinValidator = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
export { signinValidator };
