/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { FunctionComponent } from "react";
import { Button as ButtonCommon, ButtonProps } from "../../common";
import styled from "styled-components";

export const ButtonWraper: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  className,
  ariaLabel,
}) => (
  <ButtonCommon onClick={onClick} className={className} ariaLabel={ariaLabel}>
    {children}
  </ButtonCommon>
);

export const Button = styled(ButtonWraper)`
  color: inherit;
  border-color: currentColor;
`;
