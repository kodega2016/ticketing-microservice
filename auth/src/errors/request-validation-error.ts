import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((error) => {
      if (error.type == "field") {
        return { message: error.msg, field: error.path };
      } else {
        return { message: error.msg };
      }
    });
  }
}
