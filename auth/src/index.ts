import { json } from "body-parser";
import express from "express";
import { currentUserRouter } from "./routes/currentuser";
import { signinRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();

// setup express body parser
app.use(json());

// setup routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signOutRouter);

app.listen(3000, () => {
  console.log("(auth) Listening on port 3000");
});
