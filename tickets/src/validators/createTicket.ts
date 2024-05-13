import { body } from "express-validator";

const createTicketValidator = [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
];
export { createTicketValidator };
