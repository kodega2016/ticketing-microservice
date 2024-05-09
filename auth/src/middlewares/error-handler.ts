import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { NotFoundError } from "../errors/not-found-error";
import { BadRequestError } from "../errors/bad-request-error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
      data: null,
    });
  }
  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  res.status(500).json({
    data: null,
    stack: err.stack,
    errors: [{ message: err.message || "Something went wrong!" }],
  });
};

export { errorHandler };
