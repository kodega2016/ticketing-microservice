import mongoose from "mongoose";
import { app } from "./app";

// server configuration

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_DB_URI) {
    throw new Error("MONGO_DB_URI must be defined");
  }

  try {
    const response = await mongoose.connect(
      `mongodb://${process.env.MONGO_DB_URI}:27017/auth`
    );
    console.log(
      `Database connection made to:${response.connection.db.databaseName} `
    );
    app.listen(3000, () => {
      console.log("(auth) Listening on port 3000");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
