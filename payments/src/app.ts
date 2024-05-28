import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { NotFoundError, currentUser, errorHandler } from "@kodeapps/common";

const app = express();
// setup body parser
app.use(express.json());
// setup cookie parser
app.set("trust proxy", true);
app.use(
  cookieSession({
    httpOnly: false,
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// setup current user middleware
app.use(currentUser);

// setup routes
import { createChargeRouter } from "./routes/new";
app.use(createChargeRouter);

// not found route handler
app.get("*", async (req, res) => {
  throw new NotFoundError();
});

// setup error handler
app.use(errorHandler);

export { app };
