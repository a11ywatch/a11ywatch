/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const getPageSpeed = (speed: number): string => {
  if (speed >= 50000) {
    return "Connection Timeout";
  } else if (speed >= 30000) {
    return "Bad";
  } else if (speed >= 15000) {
    return "Very Slow";
  } else if (speed >= 10000) {
    return "Slow";
  } else if (speed >= 5000) {
    return "Slugish";
  } else if (speed >= 1700) {
    return "Alright";
  } else if (speed >= 1000) {
    return "Standard";
  } else if (speed >= 800) {
    return "Fast";
  } else if (speed >= 500) {
    return "Very Fast";
  } else if (speed < 500 && speed > 50) {
    return "Lightning Fast";
  } else if (speed <= 50) {
    return "Cached/Extremely Fast";
  } else if (speed <= 2) {
    return "SSR";
  }

  return "Duration Error";
};
