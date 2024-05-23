import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (process.env.JWT_KEY === undefined) {
    throw new Error("JWT_KEY must be defined");
  }
  if (process.env.MONGO_DB_URI === undefined) {
    throw new Error("MONGO_DB_URI must be defined");
  }

  try {
    const response = await mongoose.connect(
      `mongodb://${process.env.MONGO_DB_URI}:27017/orders`,
    );
    console.log(
      `Database connection made to:${response.connection.db.databaseName} `,
    );
    app.listen(3000, () => {
      console.log("orders service listening on port 3000");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
