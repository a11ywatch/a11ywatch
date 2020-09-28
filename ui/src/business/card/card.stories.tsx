import React, { FunctionComponent } from "react";
import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";
import { Card } from "./card";

export const Accessible = () => (
  <Card
    title={"The Coldest Sunset"}
    info={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.`}
    cardImage={{
      src: "https://tailwindcss.com/img/card-top.jpg",
      alt: "Sunset in the mountains",
    }}
    tags={["#photography", "#travel", "#winter"]}
    link={"/?path=/story/card--default"}
  >
    Accessible
  </Card>
);

export const Default = ({ children = "Default" }) => (
  <Card title={"Default"} info={"Default card"}>
    {children}
  </Card>
);

export const Horizontal = ({ children = "Horizontal" }) => (
  <Card
    horizontal
    cardImage={{
      src: "https://tailwindcss.com/img/card-left.jpg",
      alt: "Woman holding a mug",
    }}
    title={"Can coffee make you a better developer?"}
    info={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.`}
    author={{
      src: "https://tailwindcss.com/img/jonathan.jpg",
      name: "Jonatin",
      lastUpdated: "Aug 18",
    }}
  >
    {children}
  </Card>
);

export default {
  title: "BusinessCard",
  decorators: [withA11y],
  component: Card,
};
