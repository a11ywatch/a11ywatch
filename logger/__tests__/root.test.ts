import request from "supertest";
import { server } from "../src/server";
import { killServer } from "../src/lib/app";

afterAll(async () => {
  await killServer(server);
});

test("root renders properly", async () => {
  const res = await request(server).get("/");
  return expect(res.status).toBe(200);
});
