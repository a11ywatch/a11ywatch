/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { FunctionComponent } from "react";
import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";
import { Button } from "./button";

export const Accessible = () => (
  <Button onClick={action("clicked")}>Accessible</Button>
);

export const Default = ({ children = "Default" }) => (
  <Button>{children}</Button>
);

export default {
  title: "ModernButton",
  decorators: [withA11y],
  component: Button,
};
