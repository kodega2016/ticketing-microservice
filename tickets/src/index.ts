import { app } from "./app";

const start = async () => {
  app.listen(3000, () => {
    console.log("(tickets) Listening on port 3000");
  });
};

start();
