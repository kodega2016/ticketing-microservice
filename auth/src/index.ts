import { json } from "body-parser";
import express from "express";

const app = express();

// setup express body parser
app.use(json());

app.listen(3000, () => {
  console.log("(auth) Listening on port 3000");
});
