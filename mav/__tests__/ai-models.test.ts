import "@tensorflow/tfjs-node-gpu";
import { aiModels } from "../src/ai";
import { LOADED_MODELS } from "../src/static";
import { setConfig as setLogConfig } from "@a11ywatch/log";

setLogConfig({ container: "mav", disable: true });

test("all models load", async () => {
  jest.setTimeout(30000);

  try {
    expect(await aiModels.initModels()).toBe(LOADED_MODELS);
  } catch (e) {
    console.error(e);
  }
});
