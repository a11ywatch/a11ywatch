import request from "supertest"
import coreServer from "@app/server"

test("root renders properly", async () => {
  const res = await request(coreServer).get("/")
  return expect(res.status).toBe(200)
})
