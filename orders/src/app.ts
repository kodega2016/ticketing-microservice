import express from "express";
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler, currentUser } from "@kodeapps/common";

const app = express();
// setup express body parser
app.use(express.json());
// setup cookie session
app.set("trust proxy", true);
app.use(
  cookieSession({
    httpOnly: false,
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  }),
);

// set current user middleware
app.use(currentUser);

// not found route handler
app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
