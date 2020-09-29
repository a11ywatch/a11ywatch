import { MAIN_API_URL, ANGELICA_API_URL } from "./config";

export const corsOptions = {
  origin: [MAIN_API_URL + "", ANGELICA_API_URL + ""],
};
