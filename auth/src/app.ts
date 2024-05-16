import { json } from "body-parser";
import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/currentuser";
import { signinRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import cookieSession from "cookie-session";

import {
  errorHandler,
  currentUser,
  BadRequestError,
  NotFoundError,
} from "@kodeapps/common";
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

// set currentuser middleware
app.use(currentUser);

// setup routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signOutRouter);

// not found route handler
app.get("*", async (req, res) => {
  console.log(new NotFoundError());
  throw new BadRequestError("Route not found");
});

// setup error handler
app.use(errorHandler);

export { app };
