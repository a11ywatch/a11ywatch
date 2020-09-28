import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Button as ButtonCommon, ButtonProps } from "../../common";

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
  border: none;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
