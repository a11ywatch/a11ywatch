import React, { FunctionComponent } from "react";
import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";
import { Shape } from "./shape";

export const Circle = () => (
  <Shape onClick={action("clicked")} type={"circle"}>
    1
  </Shape>
);

export const Default = ({ children = "Default" }) => <Shape>{children}</Shape>;

export default {
  title: "ModernShape",
  decorators: [withA11y],
  component: Shape,
};
