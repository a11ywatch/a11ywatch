import { DEV, MAIN_API_URL, ANGELICA_API_URL } from "./config";

const origins = [MAIN_API_URL + "", ANGELICA_API_URL + ""];

if (DEV) {
  origins.push("localhost");
}

export const corsOptions = {
  origin: origins,
};
