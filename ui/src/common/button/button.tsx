/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { FunctionComponent } from "react";
import { ButtonProps } from "./types";

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  className,
  ariaLabel,
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${className}`}
  >
    {children}
  </button>
);
