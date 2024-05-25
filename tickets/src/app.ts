import { json } from "body-parser";
import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";
import { NotFoundError, currentUser, errorHandler } from "@kodeapps/common";
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
  }),
);

// set current user middleware
app.use(currentUser);

// setup routes
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateRouter } from "./routes/update";

app.use(indexTicketRouter);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateRouter);

// not found route handler
app.get("*", async (req, res) => {
  throw new NotFoundError();
});

// setup error handler
app.use(errorHandler);

export { app };
