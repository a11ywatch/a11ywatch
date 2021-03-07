import { DEV, MAIN_API_URL, ANGELICA_API_URL } from "./config";

const allowlist = [MAIN_API_URL + "", ANGELICA_API_URL + ""];

if (DEV) {
  allowlist.push("localhost");
}

export const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
