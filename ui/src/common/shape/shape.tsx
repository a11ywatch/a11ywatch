import React, { FunctionComponent } from "react";
import { ShapeProps } from "./types";

export const Shape: FunctionComponent<ShapeProps> = ({
  children,
  onClick,
  className,
  ariaLabel,
  type,
}) => {
  let cl = "";
  if (type === "circle") {
    cl = "rounded-full h-16 w-16 flex items-center justify-center";
  }
  const props = {
    onClick,
    "aria-label": ariaLabel,
    className: `${cl} ${className}`,
  };

  return React.createElement(onClick ? "button" : "div", props, children);
};
