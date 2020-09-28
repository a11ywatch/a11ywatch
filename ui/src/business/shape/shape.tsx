import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Shape as ShapeCommon, ShapeProps } from "../../common";

export const ShapeWraper: FunctionComponent<ShapeProps> = ({
  children,
  onClick,
  className,
  ariaLabel,
  type,
}) => (
  <ShapeCommon
    onClick={onClick}
    className={className}
    ariaLabel={ariaLabel}
    type={type}
  >
    {children}
  </ShapeCommon>
);

export const Shape = styled(ShapeWraper)`
  color: white;
  background-color: rebeccapurple;
`;
