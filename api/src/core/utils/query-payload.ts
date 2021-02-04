/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

type PayLoadInput = {
  payload?: {
    keyid?: number;
    audience?: any;
  };
};

type ContextInputType = {
  user?: PayLoadInput;
};

type PayLoadReturnType = {
  userId: number | null;
  audience: any;
};

type OverideTypeInput = {
  id?: number;
  password?: any;
};

export const getPayLoad = (
  context?: ContextInputType,
  overide?: OverideTypeInput
): PayLoadReturnType => {
  const { keyid, audience } = context?.user?.payload || {
    keyid: null,
    audience: null,
  };
  const password = overide?.password;
  const id = overide?.id;

  return {
    audience,
    userId:
      typeof id !== "undefined" &&
      typeof password !== "undefined" &&
      password === process.env.ADMIN_PASS
        ? id
        : keyid,
  };
};
