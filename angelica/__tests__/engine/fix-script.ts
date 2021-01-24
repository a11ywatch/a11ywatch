import { getIssueFixScript } from "@app/core/lib/engine";

describe("issue fix script", () => {
  test("runs and returns empty string", async () => {
    const data = await getIssueFixScript({}, 0, {});
    expect(data).toBe("");
  });
});
