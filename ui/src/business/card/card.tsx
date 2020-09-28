import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Card as CardCommon, CardProps } from "../../common";

const CardWrapper: FunctionComponent<CardProps> = ({
  info,
  className,
  title,
  cardImage,
  tags,
}) => (
  <CardCommon
    cardImage={cardImage}
    title={title}
    info={info}
    tags={tags}
    className={className}
  />
);

export const Card = styled(CardWrapper)`
  font-weight: lighter;
  background: black;
  color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
`;
