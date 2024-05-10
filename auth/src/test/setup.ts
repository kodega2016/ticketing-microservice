import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../app";
import mongoose from "mongoose";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "test";
  process.env.MONGO_DB_URI = "test";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) await mongo.stop();
  await mongoose.connection.close();
});
