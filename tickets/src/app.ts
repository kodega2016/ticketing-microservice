import { json } from "body-parser";
import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";
import { NotAuthorizedError, errorHandler } from "@kodeapps/common";
const app = express();

// setup express body parser
app.use(json());
// setup cookie session
app.set("trust proxy", true);
app.use(
  cookieSession({
    httpOnly: false,
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// setup routes

// not found route handler
app.get("*", async (req, res) => {
  throw new NotAuthorizedError();
});

// setup error handler
app.use(errorHandler);

export { app };
