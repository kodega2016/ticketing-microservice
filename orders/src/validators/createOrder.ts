import { body } from "express-validator";
import mongoose from "mongoose";

export const createOrderValidator = [
  body("ticketId")
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage("Ticket ID is required"),
];
