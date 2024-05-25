import express from "express";
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler, currentUser } from "@kodeapps/common";
import { indexOrderRouter } from "./routes";
import { showOrderRouter } from "./routes/show";
import { newOrderRouter } from "./routes/new";
import { updateOrderRouter } from "./routes/update";
import "express-async-errors";

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
// setup routes
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(updateOrderRouter);

// not found route handler
app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
