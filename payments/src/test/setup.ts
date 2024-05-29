import { MongoMemoryServer } from "mongodb-memory-server";

import Jwt from "@kodeapps/common/build/services/jwt";
import mongoose from "mongoose";

let mongo: any;

jest.mock("../nats-wrapper");
process.env.STRIPE_KEY = "test";

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

declare global {
  var signin: (id?: string) => string[];
}

global.signin = (id?: string) => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "example@example.com",
  };

  // Create the JWT!
  const token = Jwt.sign(payload);
  // Build session
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
