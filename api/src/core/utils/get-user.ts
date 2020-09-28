import { decodeJwt, verifyJwt } from "./auth";

export const getUser = (bearerToken: string): any => {
  const token = bearerToken?.includes("Bearer ") && bearerToken.split(" ")[1];

  if (token) {
    if (verifyJwt(token)) {
      return decodeJwt(token);
    }
    console.log("TOKEN EXPIRED");
  }

  return false;
};
