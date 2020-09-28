import request from "supertest";
import { ROOT } from "../src/templates";
import app, { killServer } from "../src/server";

afterAll(async () => {
  await killServer();
});

test("root page renders properly", async () => {
  return await request(app).get("/").expect(ROOT);
});
