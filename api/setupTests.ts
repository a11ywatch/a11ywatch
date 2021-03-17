import { closeDbConnection, initDbConnection } from "@app/database"
import { killServer } from "@app/server"

beforeAll(async () => {
  await initDbConnection()
})

afterAll(async () => {
  await closeDbConnection()
  await killServer()
})
