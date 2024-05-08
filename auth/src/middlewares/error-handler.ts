import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      if (error.type === "field") {
        return { message: error.msg, field: error.path };
      }
    });

    return res.status(400).json({
      errors: formattedErrors,
      data: null,
    });
  }
  if (err instanceof DatabaseConnectionError) {
    return res.status(400).json({
      errors: [{ message: err.reason }],
    });
  }

  res.status(500).json({
    message: err.message || "Something went wrong!",
    data: null,
    stack: err.stack,
  });
};

export { errorHandler };
