import request from "supertest";
import { app } from "../../app";

jest.mock("../../nats-wrapper");

const createTicket = async () => {
  await request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "title",
    price: 10,
  });
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  expect(
    (await request(app).get("/api/tickets").send()).body.data.length,
  ).toEqual(2);
});
