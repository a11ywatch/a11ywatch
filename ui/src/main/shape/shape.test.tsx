import React from "react";
import ReactDOM from "react-dom";
import { Shape } from "./shape";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Shape />, div);
  ReactDOM.unmountComponentAtNode(div);
});
