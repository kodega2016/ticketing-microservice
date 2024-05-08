import { json } from "body-parser";
import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/currentuser";
import { signinRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

// setup express body parser
app.use(json());

// setup routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signOutRouter);

// not found route handler
app.get("*", async (req, res) => {
  throw new NotFoundError();
});

// setup error handler
app.use(errorHandler);

export { app };
