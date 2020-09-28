import request from "supertest";
import app, { killServer } from "../src/server";

afterAll(async () => {
  await killServer();
});

test("iframe renders properly", async () => {
  const res = await request(app).get("/iframe?url=https://www.drake.com");
  return expect(res.status).toBe(200);
});
