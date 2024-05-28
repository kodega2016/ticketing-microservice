import { body } from "express-validator";

const validateCreateCharge = [
  body("token").not().isEmpty().withMessage("Token is required"),
  body("orderId").not().isEmpty().withMessage("Order ID is required"),
];
export { validateCreateCharge };
