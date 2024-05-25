import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
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
// setup routes
import { indexOrderRouter } from "./routes";
import { showOrderRouter } from "./routes/show";
import { newOrderRouter } from "./routes/new";
import { updateOrderRouter } from "./routes/update";
import { deleteOrderRouter } from "./routes/delete";

app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(updateOrderRouter);
app.use(deleteOrderRouter);

// not found route handler
app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
