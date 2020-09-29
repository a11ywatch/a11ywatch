import request from "supertest";
import { cdnServer, killServer } from "../src/server";

afterAll(async () => {
  await killServer();
});

test("root renders properly", async () => {
  const res = await request(cdnServer).get("/");
  return expect(res.status).toBe(200);
});
