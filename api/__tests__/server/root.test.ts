import request from "supertest";
import coreServer, { killServer } from "@app/server";

afterAll(async () => {
  await killServer();
});

test("root renders properly", async () => {
  const res = await request(coreServer).get("/");
  return expect(res.status).toBe(200);
});